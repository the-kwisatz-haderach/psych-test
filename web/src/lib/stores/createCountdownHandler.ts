import { readonly, writable } from 'svelte/store';

export const createCountdownHandler = (initialCount: number) => {
	const store = writable(initialCount);

	const run = (signal?: AbortSignal) =>
		new Promise<void>((resolve) => {
			store.set(initialCount);

			const interval = setInterval(() => {
				store.update((count) => {
					if (count < 0 || signal?.aborted) {
						clearInterval(interval);
						resolve();
					}
					return count - 1;
				});
			}, 1000);
		});

	return { count: readonly(store), run };
};
