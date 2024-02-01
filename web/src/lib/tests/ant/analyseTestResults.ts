import { meanOf } from '$lib/utils/meanOf';
import { standardDeviationOf } from '$lib/utils/standardDeviationOf';
import {
	type ANTTestAnalysis,
	type ANTTestResult,
	type Cue,
	type TargetCondition,
	type ResultCalculation,
	type ErrorRateCalculation
} from './types';
import { groupBy } from 'remeda';

const toResultCalculation = (results: ANTTestResult[] = []): ResultCalculation => {
	const durationCollection = results.filter((res) => res.correct).map((res) => res.duration);
	const mean = Math.floor(meanOf(durationCollection));
	return {
		mean,
		standardDev: standardDeviationOf(durationCollection, mean)
	};
};

const toErrorRateCalculation = (results: ANTTestResult[] = []): ErrorRateCalculation => {
	if (results.length < 1) {
		return {
			rate: 0,
			standardDev: 0
		};
	}
	const durationCollection = results.map((res) => +res.correct);
	const rate = +(1 - meanOf(durationCollection)).toFixed(2);
	return {
		rate,
		standardDev: standardDeviationOf(durationCollection, rate)
	};
};

export const analyseTestResults = (results: ANTTestResult[]): ANTTestAnalysis => {
	const byCue: Record<Cue, ANTTestResult[]> = groupBy(results, (item) => item.cue);
	const byCondition: Record<TargetCondition, ANTTestResult[]> = groupBy(
		results,
		(item) => item.targetCondition
	);
	const table = (Object.keys(byCue) as Cue[]).reduce<
		Record<Cue, Record<TargetCondition, ANTTestResult[]>>
	>(
		(acc, cue) => ({
			...acc,
			[cue]: {
				...acc[cue],
				...groupBy(byCue[cue], (item) => item.targetCondition)
			}
		}),
		{
			center: {
				congruent: [],
				incongruent: [],
				neutral: []
			},
			double: {
				congruent: [],
				incongruent: [],
				neutral: []
			},
			none: {
				congruent: [],
				incongruent: [],
				neutral: []
			},
			spatial: {
				congruent: [],
				incongruent: [],
				neutral: []
			}
		}
	);

	const responseTime: ANTTestAnalysis['responseTime'] = {
		total: toResultCalculation(results),
		center: {
			congruent: toResultCalculation(table.center.congruent),
			incongruent: toResultCalculation(table.center.incongruent),
			neutral: toResultCalculation(table.center.neutral),
			total: toResultCalculation([
				...table.center.congruent,
				...table.center.incongruent,
				...table.center.neutral
			])
		},
		none: {
			congruent: toResultCalculation(table.none.congruent),
			incongruent: toResultCalculation(table.none.incongruent),
			neutral: toResultCalculation(table.none.neutral),
			total: toResultCalculation([
				...table.none.congruent,
				...table.none.incongruent,
				...table.none.neutral
			])
		},
		double: {
			congruent: toResultCalculation(table.double.congruent),
			incongruent: toResultCalculation(table.double.incongruent),
			neutral: toResultCalculation(table.double.neutral),
			total: toResultCalculation([
				...table.double.congruent,
				...table.double.incongruent,
				...table.double.neutral
			])
		},
		spatial: {
			congruent: toResultCalculation(table.spatial.congruent),
			incongruent: toResultCalculation(table.spatial.incongruent),
			neutral: toResultCalculation(table.spatial.neutral),
			total: toResultCalculation([
				...table.spatial.congruent,
				...table.spatial.incongruent,
				...table.spatial.neutral
			])
		}
	};

	const errorRate: ANTTestAnalysis['errorRate'] = {
		total: toErrorRateCalculation(results),
		center: {
			congruent: toErrorRateCalculation(table.center.congruent),
			incongruent: toErrorRateCalculation(table.center.incongruent),
			neutral: toErrorRateCalculation(table.center.neutral),
			total: toErrorRateCalculation([
				...table.center.congruent,
				...table.center.incongruent,
				...table.center.neutral
			])
		},
		none: {
			congruent: toErrorRateCalculation(table.none.congruent),
			incongruent: toErrorRateCalculation(table.none.incongruent),
			neutral: toErrorRateCalculation(table.none.neutral),
			total: toErrorRateCalculation([
				...table.none.congruent,
				...table.none.incongruent,
				...table.none.neutral
			])
		},
		double: {
			congruent: toErrorRateCalculation(table.double.congruent),
			incongruent: toErrorRateCalculation(table.double.incongruent),
			neutral: toErrorRateCalculation(table.double.neutral),
			total: toErrorRateCalculation([
				...table.double.congruent,
				...table.double.incongruent,
				...table.double.neutral
			])
		},
		spatial: {
			congruent: toErrorRateCalculation(table.spatial.congruent),
			incongruent: toErrorRateCalculation(table.spatial.incongruent),
			neutral: toErrorRateCalculation(table.spatial.neutral),
			total: toErrorRateCalculation([
				...table.spatial.congruent,
				...table.spatial.incongruent,
				...table.spatial.neutral
			])
		}
	};

	return {
		responseTime,
		errorRate,
		alerting: responseTime.none.total.mean - responseTime.double.total.mean,
		orienting: responseTime.center.total.mean - responseTime.spatial.total.mean,
		executiveAttention:
			toResultCalculation(byCondition.incongruent).mean -
			toResultCalculation(byCondition.congruent).mean
	};
};
