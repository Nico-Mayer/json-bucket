<script lang="ts">
	import { PUBLIC_DEMO_EMAIL } from '$env/static/public'
	import { activeTheme } from '$lib/stores/store'
	import { invalidateAll } from '$app/navigation'
	import { toast } from 'svelte-sonner'
	import { formatTimestamp } from '$lib/utils/utils'
	import cronParser from 'cron-parser'

	export let data

	let deleteInputValue = ''
	let name: string
	let email: string
	let avatar_url: string

	$: ({ session, supabase } = data)

	$: isTestUser = email === PUBLIC_DEMO_EMAIL
	$: canDelete = deleteInputValue === 'DELETE' && email !== PUBLIC_DEMO_EMAIL
	$: user = session?.user
	$: user_metadata = session?.user?.user_metadata
	$: {
		name =
			user_metadata?.preferred_username ??
			user_metadata?.user_name ??
			user_metadata?.name ??
			user_metadata?.full_name ??
			'Test User'
		email = user?.email ?? 'No email found'
		avatar_url =
			user_metadata?.avatar_url ??
			'https://api.iconify.design/carbon:user-avatar.svg?color=%23878787'
	}

	function getNextCronExecution() {
		const interval = cronParser.parseExpression('0 1 * * *')
		const nextExecution = interval.next().toDate()
		return nextExecution
	}

	async function handleLogout() {
		toast.promise(supabase.auth.signOut(), {
			loading: 'Logging out...',
			success: 'Logged out!',
			error: 'Could not log out.',
		})

		await invalidateAll()
	}

	async function handleDeleteUser() {
		await fetch('/protected-api/delete-user', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		await invalidateAll()
	}

	function setTheme(theme: string) {
		if (theme === 'dark') {
			localStorage.setItem('theme', 'dark')
			document.documentElement.classList.add('dark')
			$activeTheme = 'dark'
			return
		} else {
			localStorage.setItem('theme', 'light')
			document.documentElement.classList.remove('dark')
			$activeTheme = 'light'
			return
		}
	}
</script>

{#if user_metadata}
	<div class="w-full flex justify-center flex-col p-4 gap-4">
		<section
			class="flex p-4 sm:px-8 rounded border justify-between items-center">
			<div class="flex items-center">
				<img
					src={avatar_url}
					alt="avatar"
					class="h-14 sm:h-16 rounded-full" />
				<div class="flex flex-col mx-4">
					<strong class="my-1 text-lg">{name}</strong>

					<p class="text-left text-xs block">
						<strong class="block font-medium opacity-70">
							{email}
						</strong>
					</p>
				</div>
			</div>

			<button title="Logout" class="btn h-8" on:click={handleLogout}>
				<div class="i-carbon-logout" />
				<span class="hidden sm:block">Logout</span>
			</button>
		</section>

		{#if isTestUser}
			<section
				class="flex p-4 sm:px-8 rounded border justify-between items-center">
				<div class="flex items-center">
					<div class="flex flex-col mx-4">
						<strong class="my-1 sm:my-2 text-lg">Info</strong>

						<div class="bade bade-warning flex flex-col text-xs">
							<span>
								The buckets assigned to the test user will be
								deleted at:
							</span>

							<div class="badge badge-warning my-1 sm:my-2">
								{formatTimestamp(getNextCronExecution())}
							</div>
						</div>
					</div>
				</div>
			</section>
		{/if}

		<section class="flex p-4 sm:px-8 rounded border">
			<div class="flex flex-col">
				<strong class="my-1 sm:my-2 text-lg">Appearance</strong>

				<div class="my-2 flex">
					<button
						class="btn !rounded-l !rounded-r-none h-8"
						on:click={() => setTheme('light')}
						class:active-btn={$activeTheme === 'light'}>
						<div class="i-carbon-sun" />
						<span>Light</span>
					</button>
					<button
						class="btn !rounded-r !rounded-l-none h-8"
						on:click={() => setTheme('dark')}
						class:active-btn={$activeTheme === 'dark'}>
						<div class="i-carbon-moon" />
						<span>Dark</span>
					</button>
				</div>
			</div>
		</section>

		<section class="flex p-4 sm:px-8 rounded border">
			<div class="flex flex-col w-96">
				<strong class="my-2 text-lg">Account</strong>
				<h3 class="my-1 font-semibold text-red-500">Delete Account</h3>

				{#if isTestUser}
					<span class="text-sm my-1 text-red-500"
						>Test user cannot be deleted.</span>
				{:else}
					<p class="text-sm my-1 text-red-500">
						All data connected to your account will be permanently
						lost upon its deletion.
					</p>
				{/if}
				<span class="my-1 text-sm text-red-500">
					Type in "DELETE"
				</span>

				<form
					class:pointer-events-none={isTestUser}
					class="flex flex-col gap-2"
					on:submit|preventDefault>
					<input
						disabled={isTestUser}
						class="input h-8"
						type="text"
						maxlength="6"
						bind:value={deleteInputValue} />
					<button
						disabled={!canDelete || isTestUser}
						class:disabled-btn={!canDelete}
						class="btn delete-btn h-8"
						on:click={handleDeleteUser}>
						<div class="i-carbon-trash-can" />
						<span>Delete Account</span>
					</button>
				</form>
			</div>
		</section>
	</div>
{/if}
