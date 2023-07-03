<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import type { UserMetadata } from '@supabase/supabase-js'
	import { onMount } from 'svelte'

	export let data

	let user_metadata: UserMetadata
	let activeTheme: string | null

	onMount(() => {
		activeTheme = localStorage.getItem('theme')
	})

	$: ({ session, supabase } = data)
	$: if (session) {
		user_metadata = session?.user?.user_metadata
	}

	async function handleLogout() {
		const { error } = await supabase.auth.signOut()
		if (error) console.log(error)
		await invalidateAll()
	}
	function setTheme(theme: string) {
		if (theme === 'dark') {
			localStorage.setItem('theme', 'dark')
			document.documentElement.classList.add('dark')
			activeTheme = 'dark'
			return
		} else {
			localStorage.setItem('theme', 'light')
			document.documentElement.classList.remove('dark')
			activeTheme = 'light'
			return
		}
	}
</script>

{#if user_metadata}
	<main class="w-full flex justify-center flex-col p-4 gap-4">
		<section class="flex p-4 rounded border justify-between">
			<div class="flex flex-col px-4">
				<strong class="my-2">Profile</strong>

				<p class="text-left text-xs block">
					<strong class="block font-medium">
						{user_metadata.name}
					</strong>

					<span class="opacity-60">{user_metadata.email}</span>
				</p>
			</div>
			<img
				src={user_metadata.avatar_url}
				alt="avatar"
				class="h-24 rounded-full mr-4" />
		</section>

		<section class="flex p-4 rounded border">
			<div class="flex flex-col px-4">
				<strong class="my-2">Appearance</strong>

				<div class="my-2 flex gap-2">
					<button
						class="btn"
						on:click={() => setTheme('light')}
						class:active={activeTheme === 'light'}>
						<div class="i-carbon-sun" />
						<span>Light</span>
					</button>
					<button
						class="btn"
						on:click={() => setTheme('dark')}
						class:active={activeTheme === 'dark'}>
						<div class="i-carbon-moon" />
						<span>Dark</span>
					</button>
				</div>
			</div>
		</section>

		<section class="flex p-4 rounded border">
			<div class="flex flex-col px-4">
				<strong class="my-2">Account</strong>

				<div class="my-2 flex gap-2">
					<button class="btn" on:click={handleLogout}>
						<div class="i-carbon-logout" />
						<span>Logout</span>
					</button>
					<button class="btn delete-btn">
						<div class="i-carbon-trash-can" />
						<span>Delete Account</span>
					</button>
				</div>
			</div>
		</section>
	</main>
{/if}

<style lang="postcss" scoped>
	.delete-btn {
		color: white !important;
		@apply bg-red-400 border-red-400;
	}
	.delete-btn:hover {
		@apply bg-red-500 border-red-500 text-white;
	}
	.active {
		@apply bg-gray-200 dark:bg-slate-950;
	}
</style>
