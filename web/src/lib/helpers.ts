import type { Cue } from './types';

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
