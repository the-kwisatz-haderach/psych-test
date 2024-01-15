import type { Cue } from './types';

const symbols = {
	ArrowRight: '→',
	ArrowLeft: '←',
	cue: '✴',
	neutral: '—'
} as const;

export const createSymbol = (symbol: keyof typeof symbols, reverse = false) => {
	const el = document.createElement('div');
	el.innerText = symbols[symbol];
	el.className = `symbol${reverse ? ' reverse' : ''}`;
	return el;
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initPositionElements = () => {
	const top = document.getElementById('top') as HTMLElement;
	const center = document.getElementById('center') as HTMLElement;
	const bottom = document.getElementById('bottom') as HTMLElement;

	const clearMarkup = () => {
		if (top) {
			top.innerHTML = '';
			top.classList.remove('show');
		}
		if (center) {
			center.innerHTML = '';
			center.classList.remove('show');
		}
		if (bottom) {
			bottom.innerHTML = '';
			bottom.classList.remove('show');
		}
	};

	return { top, center, bottom, clearMarkup };
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
