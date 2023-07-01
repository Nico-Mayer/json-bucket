<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data
	let { supabase } = data
	let _mounted = false

	onMount(() => {
		_mounted = true
	})

	$: ({ supabase } = data)
	$: if (data.session) {
		if (_mounted) {
			goto('/protected-routes/home')
		}
	}

	const signInWithGithub = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
		})
		if (error) console.log(error)
	}
</script>

<main class="w-screen h-screen flex flex-col items-center justify-center gap-5">
	<div class="i-tabler-bucket text-7xl" />

	<h1 class="px-2 font-bold text-lg md:text-xl">JSON Bucket</h1>

	<button class="btn" on:click={signInWithGithub}>
		<div class="i-simple-icons-github" />
		Sign in with Github
	</button>
</main>
