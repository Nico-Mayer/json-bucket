const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		animatedSettings: {
			classes: ['wobble', 'swing', 'fast'],
		},
		extend: {
			colors: {
				nord: {
					0: '#2E3440',
					1: '#3B4252',
					2: '#434C5E',
					3: '#4C566A',
					4: '#D8DEE9',
					5: '#E5E9F0',
					6: '#ECEFF4',
					7: '#8FBCBB',
					8: '#88C0D0',
					9: '#81A1C1',
					10: '#5E81AC',
					11: '#BF616A',
					12: '#D08770',
					13: '#EBCB8B',
					14: '#A3BE8C',
					15: '#B48EAD',
				},
			},
		},
	},
	plugins: [
		iconsPlugin({
			collections: getIconCollections([
				'tabler',
				'simple-icons',
				'carbon',
			]),
		}),
		require('tailwindcss-animatecss'),
	],
}
