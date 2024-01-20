import isLoggedIn from '$lib/auth/isLoggedIn.js';
import type { User } from '$lib/tests/ant/types.js';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;
export const ssr = false;

export async function load({ fetch }): Promise<Partial<User>> {
	if (isLoggedIn()) {
		const res = await fetch('/api/user');
		const data = await res.json();
		return data;
	}
	return {};
}
