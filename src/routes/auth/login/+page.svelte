<script lang="ts">
	export let data
	let { supabase } = data
	$: ({ supabase } = data)

	let email: string
	let password: string

	const signInWithGithub = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
		})
		if (error) console.log(error)
	}

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		})
	}

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password,
		})
	}

	const handleSignOut = async () => {
		console.log('sign out')
		await supabase.auth.signOut()
	}
	//handleSignIn()
	//handleSignOut()
</script>

<main class="w-screen h-screen flex justify-center items-center flex-col gap-4">
	<h1 class="font-bold text-lg md:text-xl">JSON Bucket</h1>

	<label for="email"> email </label>
	<input
		class="border"
		bind:value={email}
		type="email"
		name="email"
		id="email" />

	<label for="password">pw</label>
	<input
		class="border"
		bind:value={password}
		type="password"
		name="password"
		id="password" />

	<button class="border" on:click={handleSignIn}>Sign In</button>
	<button class="border" on:click={handleSignUp}>Sign Up</button>
	<button class="border" on:click={handleSignOut}>Sign Out</button>

	<button
		on:click={signInWithGithub}
		class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
		<div class="i-tabler-brand-github" />
		Sign in with Github
	</button>
</main>
