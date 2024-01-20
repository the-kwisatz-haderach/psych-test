import type { Cue } from '../tests/ant/types';

export const abortable = <T extends (...args: never[]) => Promise<unknown>>(
	fn: T,
	signal: AbortSignal
): T => <T>function (...args: Parameters<T>) {
		if (signal.aborted) {
			return Promise.reject('aborted');
		}
		return fn(...args);
	};

export const determineElementPosition = (cue: Cue = 'none') => {
	const elements: Extract<Cue, 'top' | 'bottom' | 'center'>[] = [];
	switch (cue) {
		case 'none':
			break;
		case 'top': {
			elements.push('top');
			break;
		}
		case 'bottom': {
			elements.push('bottom');
			break;
		}
		case 'double':
			elements.push('top');
			elements.push('bottom');
			break;
		case 'center': {
			elements.push('center');
			break;
		}
	}
	return elements;
};

export function setupListener() {
	return new Promise((resolve) => {
		document.addEventListener('keydown', function handleKeypress(e) {
			if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				document.removeEventListener('keydown', handleKeypress);
				resolve(e.key);
			}
		});
	});
}
