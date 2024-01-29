import { meanOf } from '$lib/utils/meanOf';
import type { ANTTestAnalysis, ANTTestResult, Cue, TargetCondition } from './types';

export const analyseTestResults = (results: ANTTestResult[]): ANTTestAnalysis => {
	const scores = results.reduce<{
		[K in Cue | TargetCondition]: number[];
	}>(
		(acc, curr) => ({
			...acc,
			[curr.state.cue]: [...acc[curr.state.cue], curr.duration],
			[curr.state.targetCondition]: [...acc[curr.state.targetCondition], curr.duration]
		}),
		{
			none: [],
			spatial: [],
			double: [],
			center: [],
			congruent: [],
			incongruent: [],
			neutral: []
		}
	);
	const errorRates = Object.entries(
		results.reduce<Record<TargetCondition, number[]>>(
			(acc, curr) => ({
				...acc,
				[curr.state.targetCondition]: [...acc[curr.state.targetCondition], +curr.correct]
			}),
			{
				congruent: [],
				incongruent: [],
				neutral: []
			}
		)
	).reduce<Record<TargetCondition, number>>(
		(acc, [key, values]) => ({
			...acc,
			[key]: 1 - meanOf(values)
		}),
		{
			congruent: 0,
			incongruent: 0,
			neutral: 0
		}
	);
	return {
		errorRates,
		alerting: meanOf(scores.none) - meanOf(scores.double),
		orienting: meanOf(scores.center) - meanOf(scores.spatial),
		executiveAttention: meanOf(scores.incongruent) - meanOf(scores.congruent)
	};
};
