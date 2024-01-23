export type Cue = 'none' | 'double' | 'spatial' | 'center';
export type TargetDirection = 'ArrowLeft' | 'ArrowRight';
export type TargetCondition = 'congruent' | 'incongruent' | 'neutral';
export type TargetPosition = 'top' | 'bottom';
export type TestPhase = 'fixation' | 'cue' | 'intermediate-fixation' | 'target';

export type TestConfig = {
	cueDuration: number;
	fixationDuration: number;
	testDuration: number;
	targetMaxTime: number;
	intermediateFixationDuration: number;
};

export type User = {
	family_name: string;
	given_name: string;
	locale: string;
	name: string;
	nickname: string;
	picture: string;
};

export type ANTTestResult = {
	duration: number;
	correct: boolean;
	state: ANTTestState;
};

export type ANTTestAnalysis = {
	alerting: number;
	orienting: number;
	executiveAttention: number;
};

const meanOf = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0) / arr.length;

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
	return {
		alerting: meanOf(scores.none) - meanOf(scores.double),
		orienting: meanOf(scores.center) - meanOf(scores.spatial),
		executiveAttention: meanOf(scores.incongruent) - meanOf(scores.congruent)
	};
};

export type ANTTestState = {
	phase: TestPhase;
	cue: Cue;
	targetPosition: TargetPosition;
	targetDirection: TargetDirection;
	targetCondition: TargetCondition;
};
