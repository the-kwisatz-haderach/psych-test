import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Lato', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				primary: {
					...colors.sky
				}
			}
		}
	}
};

module.exports = config;
