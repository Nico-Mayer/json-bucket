<script lang="ts">
	import '../app.css'
	import { activeTheme } from '$lib/stores/store'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const theme = localStorage.getItem('theme')

		switch (theme) {
			case 'dark':
				$activeTheme = 'dark'
				break
			case 'light':
				$activeTheme = 'light'
				break
			default:
				$activeTheme = 'dark'
				break
		}

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>JSON Bucket</title>
</svelte:head>

<main
	class="w-screen h-screen text-black/80 dark:bg-black dark:text-white/80 overflow-hidden">
	<slot />
</main>
