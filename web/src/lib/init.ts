import { determineElementPosition } from './helpers';
import type { Condition, Cue, CueDirection, TargetDirection } from './types';

const cueDirection = ['top', 'bottom', 'double'] as const satisfies CueDirection[];
const targetDirection = ['ArrowLeft', 'ArrowRight'] as const satisfies TargetDirection[];
const condition = ['congruent', 'incongruent', 'neutral'] as const satisfies Condition[];

export const createStateGenerator = (totalDurationMs: number) => {
	const endTime = Date.now() + totalDurationMs;
	return function* generateState(): Generator<
		{
			positions: Extract<Cue, 'top' | 'bottom' | 'center'>[];
			cue: Cue;
			targetDirection: TargetDirection;
			targetCondition: Condition;
			hasCue: boolean;
		},
		void
	> {
		while (Date.now() < endTime) {
			const cue = cueDirection[Math.floor(Math.random() * cueDirection.length)];
			const positions = determineElementPosition(cue);
			yield {
				positions,
				cue,
				targetDirection: targetDirection[Math.floor(Math.random() * targetDirection.length)],
				targetCondition: condition[Math.floor(Math.random() * condition.length)],
				hasCue: Math.random() > 0.5
			};
		}
	};
};
