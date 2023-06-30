<script lang="ts">
	// relies on script in app.html
	import { onMount } from 'svelte'
	let theme: string | null

	onMount(() => {
		theme = localStorage.getItem('theme')
	})

	function toggleTheme() {
		document.documentElement.classList.toggle('dark')
		if (theme === 'dark') {
			theme = 'light'
			localStorage.setItem('theme', 'light')
			return
		}
		theme = 'dark'
		localStorage.setItem('theme', 'dark')
	}
</script>

<button
	on:click={toggleTheme}
	class="rounded flex bg-nord-5 h-10 p-2 top-10 right-10 w-10 absolute dark:bg-nord-3">
	<div
		class="animate__fast text-2xl"
		class:i-tabler-sun={theme == 'light'}
		class:i-tabler-moon={theme == 'dark'}
		class:animate__wobble={theme == 'dark'}
		class:animate__swing={theme == 'light'} />
</button>
