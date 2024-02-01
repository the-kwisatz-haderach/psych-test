export const abortable = <T extends (...args: never[]) => Promise<unknown>>(
	fn: T,
	signal: AbortSignal
): T => <T>function (...args: Parameters<T>) {
		if (signal.aborted) {
			return Promise.reject('aborted');
		}
		return fn(...args);
	};

export function setupListener() {
	return new Promise<'ArrowLeft' | 'ArrowRight' | ''>((resolve) => {
		document.addEventListener('keydown', function handleKeypress(e) {
			if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				document.removeEventListener('keydown', handleKeypress);
				resolve(e.key);
			}
			resolve('');
		});
	});
}
