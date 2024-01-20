import { determineElementPosition } from '../../utils/helpers';
import type { Condition, CueDirection, TargetDirection, ANTTestState } from './types';

const cueDirections = ['top', 'bottom', 'double'] as const satisfies CueDirection[];
const targetDirections = ['ArrowLeft', 'ArrowRight'] as const satisfies TargetDirection[];
const conditions = ['congruent', 'incongruent', 'neutral'] as const satisfies Condition[];

export const createStateGenerator = (totalDurationMs: number) => {
	const endTime = Date.now() + totalDurationMs;
	return function* generateState(): Generator<ANTTestState, void> {
		while (Date.now() < endTime) {
			const cue = cueDirections[Math.floor(Math.random() * cueDirections.length)];
			const positions = determineElementPosition(cue);
			yield {
				positions,
				cue,
				targetDirection: targetDirections[Math.floor(Math.random() * targetDirections.length)],
				targetCondition: conditions[Math.floor(Math.random() * conditions.length)],
				hasCue: Math.random() > 0.5
			};
		}
	};
};
