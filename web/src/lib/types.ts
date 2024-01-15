export type Cue = 'none' | 'double' | 'top' | 'bottom' | 'center';
export type CueDirection = 'top' | 'bottom' | 'double';
export type TargetDirection = 'ArrowLeft' | 'ArrowRight';
export type Condition = 'congruent' | 'incongruent' | 'neutral';

export type TestConfig = {
	cueDuration: number;
	soaDuration: number;
	fixationDuration: number;
	testDuration: number;
	targetMaxTime: number;
	withCue: boolean;
};
