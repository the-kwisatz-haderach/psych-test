import {
	type ANTTestState,
	cues,
	targetPositions,
	targetDirections,
	targetConditions,
	phases
} from './types';

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
