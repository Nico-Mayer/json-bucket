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

				secondaryLight: '#fafaf9',
				secondaryLightHover: '#f5f5f4',
			},
		},

		animatedSettings: {
			classes: ['wobble', 'swing', 'fast'],
		},
	},
	plugins: [
		iconsPlugin({
			collections: getIconCollections(['simple-icons', 'carbon']),
		}),
		require('tailwindcss-animatecss'),
	],
}
