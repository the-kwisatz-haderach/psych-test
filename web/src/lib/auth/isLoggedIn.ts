import { browser } from '$app/environment';

export default function isLoggedIn() {
	return browser ? document.cookie.includes('auth-session') : false;
}
