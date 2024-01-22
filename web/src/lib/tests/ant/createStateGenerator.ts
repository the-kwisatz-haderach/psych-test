import type {
	TargetCondition,
	Cue,
	TargetDirection,
	ANTTestState,
	TargetPosition,
	TestPhase
} from './types';

const phases = [
	'fixation',
	'cue',
	'intermediate-fixation',
	'target'
] as const satisfies TestPhase[];
const targetPositions = ['top', 'bottom'] as const satisfies TargetPosition[];
const cues = ['none', 'double', 'center', 'spatial'] as const satisfies Cue[];
const targetDirections = ['ArrowLeft', 'ArrowRight'] as const satisfies TargetDirection[];
const targetConditions = [
	'congruent',
	'incongruent',
	'neutral'
] as const satisfies TargetCondition[];

const createState = (): Omit<ANTTestState, 'phase'> => {
	const cue = cues[Math.floor(Math.random() * cues.length)];
	const targetPosition = targetPositions[Math.floor(Math.random() * targetPositions.length)];
	return {
		cue,
		targetPosition,
		targetDirection: targetDirections[Math.floor(Math.random() * targetDirections.length)],
		targetCondition: targetConditions[Math.floor(Math.random() * targetConditions.length)]
	};
};

export const createStateGenerator = (totalDurationMs: number) => {
	let phaseIndex = 0;
	const endTime = Date.now() + totalDurationMs;
	let state = createState();

	return function* generateState(): Generator<ANTTestState, void> {
		while (Date.now() < endTime) {
			if (phaseIndex % phases.length === 0) {
				state = createState();
			}
			const currentPhase = phases[phaseIndex % phases.length];
			phaseIndex += 1;
			yield {
				...state,
				phase: currentPhase
			};
		}
	};
};
