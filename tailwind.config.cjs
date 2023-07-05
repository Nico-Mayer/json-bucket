const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				secondaryDark: '#101112',
				secondaryDarkHover: '#17181a',
				secondaryDarkActive: '#2e2f31',

				secondaryLight: '#f9fafb',
				secondaryLightHover: '#f3f4f6',
				secondaryLightActive: '#e5e7eb',
			},
		},

		animatedSettings: {
			classes: [],
		},
	},
	plugins: [
		iconsPlugin({
			collections: getIconCollections(['simple-icons', 'carbon']),
		}),
		require('tailwindcss-animatecss'),
	],
}
