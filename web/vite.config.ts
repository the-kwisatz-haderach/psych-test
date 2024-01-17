import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
			'/api': 'http://localhost:8000',
			'/logout': 'http://localhost:8000',
			'/login': 'http://localhost:8000',
			'/callback': 'http://localhost:8000'
		}
	}
});
