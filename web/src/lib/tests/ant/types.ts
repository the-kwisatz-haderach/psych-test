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
	errorRates: Record<TargetCondition, number>;
};

export type ANTTestState = {
	phase: TestPhase;
	cue: Cue;
	targetPosition: TargetPosition;
	targetDirection: TargetDirection;
	targetCondition: TargetCondition;
};
