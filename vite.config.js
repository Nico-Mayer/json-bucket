import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			'codemirror',
			'@codemirror/language-json',
			'@codemirror/lint',
			'@codemirror/lang-json',
			'@codemirror/state',
		],
	},
}

export default config
