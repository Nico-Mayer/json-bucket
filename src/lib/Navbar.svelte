<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'

	$: pathname = $page.url.pathname

	$: onHome = pathname.startsWith('/protected-routes/home')
	$: onBucket = pathname.startsWith('/protected-routes/bucket')

	export let user_metadata

	let showDropdown = false
	let avatar_url = user_metadata?.avatar_url
	let name = user_metadata?.name
	let email = user_metadata?.email

	const handleCreateBucket = async () => {
		await fetch('/protected-api/new-bucket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		await invalidateAll()
	}

	const handleGoBack = () => {
		goto('/protected-routes/home')
	}
</script>

<nav
	class="w-full px-2 sm:px-4 py-2 flex justify-between border-b items-center">
	{#if onHome}
		<button
			on:click={() => handleCreateBucket()}
			class="shadow px-4 py-2 flex items-center hover:bg-nord-5 text-center text-sm gap-2 border"
			title="New bucket">
			<div class="i-tabler-plus" />
			<span class="font-semibold">New bucket</span>
		</button>
	{:else if onBucket}
		<button
			on:click={() => handleGoBack()}
			class="shadow px-4 py-2 flex items-center hover:bg-nord-5 text-center text-sm gap-2 border"
			title="New bucket">
			<div class="i-tabler-arrow-back" />
		</button>
	{/if}

	<button
		on:click={() => (showDropdown = !showDropdown)}
		class="group flex shrink-0 items-center relative">
		<span class="sr-only">Menu</span>
		<img
			alt="avatar"
			src={avatar_url}
			class="h-10 w-10 rounded-full object-cover" />

		<p class="ms-2 hidden text-left text-xs sm:block">
			<strong class="block font-medium">{name}</strong>

			<span class="text-gray-500">{email}</span>
		</p>
	</button>
</nav>
