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
} & Omit<ANTTestState, 'phase'>;

export type ResultCalculation = { mean: number; standardDev: number };
export type ErrorRateCalculation = { rate: number; standardDev: number };

export type ANTTestAnalysis = {
	alerting: number;
	orienting: number;
	executiveAttention: number;
	responseTime: Record<
		Cue,
		{ total: ResultCalculation } & Record<TargetCondition, ResultCalculation>
	> & { total: ResultCalculation };
	errorRate: Record<
		Cue,
		{ total: ErrorRateCalculation } & Record<TargetCondition, ErrorRateCalculation>
	> & { total: ErrorRateCalculation };
};

export type ANTTestState = {
	phase: TestPhase;
	cue: Cue;
	targetPosition: TargetPosition;
	targetDirection: TargetDirection;
	targetCondition: TargetCondition;
};

export const phases = [
	'fixation',
	'cue',
	'intermediate-fixation',
	'target'
] as const satisfies TestPhase[];
export const targetPositions = ['top', 'bottom'] as const satisfies TargetPosition[];
export const cues = ['none', 'double', 'center', 'spatial'] as const satisfies Cue[];
export const targetDirections = ['ArrowLeft', 'ArrowRight'] as const satisfies TargetDirection[];
export const targetConditions = [
	'congruent',
	'incongruent',
	'neutral'
] as const satisfies TargetCondition[];
