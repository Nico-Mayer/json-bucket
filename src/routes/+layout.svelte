<script lang="ts">
	import '../app.css'
	import ThemeToggle from '$lib/ThemeToggle.svelte'
</script>

<main
	class="flex h-screen bg-nord-4 w-screen text-nord-0 relative dark:bg-nord-0 dark:text-nord-6">
	<ThemeToggle />
	<slot />
</main>
