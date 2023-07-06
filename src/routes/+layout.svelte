<script lang="ts">
	import '../app.css'
	import { activeTheme } from '$lib/stores/store'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { Toaster } from 'svelte-sonner'

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
	<!-- Basic Meta Tags -->
	<title>JSON Bucket</title>
	<meta
		name="description"
		content="Effortlessly store your JSON data and seamlessly access it anywhere through generated API routes." />

	<!-- Google / Search Engine Tags -->
	<meta itemprop="name" content="JSON Bucket" />
	<meta
		itemprop="description"
		content="Effortlessly store your JSON data and seamlessly access it anywhere through generated API routes." />
	<meta
		itemprop="image"
		content="https://github.com/Nico-Mayer/json-bucket/blob/main/static/meta.png?raw=true" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://json-bucket.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="JSON Bucket" />
	<meta
		property="og:description"
		content="Effortlessly store your JSON data and seamlessly access it anywhere through generated API routes." />
	<meta
		property="og:image"
		content="https://github.com/Nico-Mayer/json-bucket/blob/main/static/meta.png?raw=true" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="JSON Bucket" />
	<meta
		name="twitter:description"
		content="Effortlessly store your JSON data and seamlessly access it anywhere through generated API routes." />
	<meta
		name="twitter:image"
		content="https://github.com/Nico-Mayer/json-bucket/blob/main/static/meta.png?raw=true" />

	<!-- Discord Meta Tags -->
	<meta property="og:title" content="JSON Bucket" />
	<meta
		property="og:description"
		content="Effortlessly store your JSON data and seamlessly access it anywhere through generated API routes." />
	<meta
		property="og:image"
		content="https://github.com/Nico-Mayer/json-bucket/blob/main/static/meta.png?raw=true" />
	<meta property="og:url" content="https://json-bucket.vercel.app/" />
	<meta property="theme-color" content="#7289DA" />

	<!-- Reddit Meta Tags -->
	<meta property="og:title" content="JSON Bucket" />
	<meta
		property="og:description"
		content="Effortlessly store your JSON data and seamlessly access it anywhere through generated API routes." />
	<meta
		property="og:image"
		content="https://github.com/Nico-Mayer/json-bucket/blob/main/static/meta.png?raw=true" />
	<meta property="og:url" content="https://json-bucket.vercel.app/" />

	<!-- Github Meta Tags -->
	<meta property="og:url" content="https://json-bucket.vercel.app/" />
	<meta property="og:title" content="JSON Bucket" />
	<meta
		property="og:description"
		content="Effortlessly store your JSON data and seamlessly access it anywhere through generated API routes." />
	<meta
		property="og:image"
		content="https://github.com/Nico-Mayer/json-bucket/blob/main/static/meta.png?raw=true" />
</svelte:head>

<main
	class="text-black/80 dark:bg-black dark:text-white/80 overflow-hidden w-screen">
	<slot />
	<Toaster
		toastOptions={{
			class: 'my-toast',
		}}
		richColors={false}
		position="bottom-right"
		theme={$activeTheme} />
</main>
