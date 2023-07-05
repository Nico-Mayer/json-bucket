<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { homeSearchTerm, selectedBuckets } from '$lib/stores/store'
	import { toast } from 'svelte-sonner'
	import { fade } from 'svelte/transition'

	$: pathname = $page?.url.pathname
	$: onHome = pathname.startsWith('/protected-routes/home')
	$: onBucket = pathname.startsWith('/protected-routes/bucket')
	$: onSettings = pathname.startsWith('/protected-routes/settings')

	export let user_metadata

	let avatar_url = user_metadata?.avatar_url
	let name = user_metadata?.name
	let email = user_metadata?.email
	let canDelete = false

	const handleCreateBucket = async () => {
		toast.promise(createNewBucket(), {
			loading: 'Creating new bucket...',
			success: 'Bucket created!',
			error: 'Could not create bucket.',
		})

		$homeSearchTerm = ''
		await invalidateAll()
	}

	async function createNewBucket() {
		await fetch('/protected-api/new-bucket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	async function handleDeleteBuckets() {
		if ($selectedBuckets.length <= 0) return
		if (!canDelete) {
			canDelete = true

			setTimeout(() => {
				canDelete = false
			}, 5000)
			return
		}

		if (canDelete) {
			toast.promise(deleteBuckets(), {
				loading: 'Deleting buckets...',
				success: 'Buckets deleted!',
				error: 'Could not delete buckets.',
			})
		}
	}

	async function deleteBuckets() {
		await fetch(`/protected-api/delete-bucket/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ buckets: $selectedBuckets }),
		})
		canDelete = false
		$selectedBuckets = []
		invalidateAll()
	}

	const handleGoBack = () => {
		goto('/protected-routes/home')
	}
	const handleGoToSettings = () => {
		goto('/protected-routes/settings')
	}
</script>

<nav
	class="w-full px-2 sm:px-4 py-3 flex justify-between border-b items-center">
	<section class="w-1/3 flex gap-2">
		{#if onHome}
			<button
				on:click={() => handleCreateBucket()}
				class="btn h-8 w-8 !p-0 shrink-0"
				title="New bucket">
				<div class="i-carbon-add text-xl" />
			</button>

			<input
				bind:value={$homeSearchTerm}
				type="text"
				placeholder="Search"
				class="input hidden sm:block" />

			{#if $selectedBuckets.length > 0}
				<button
					transition:fade
					on:click={() => handleDeleteBuckets()}
					title="Delete buckets"
					class:delete-btn={canDelete}
					class="btn h-[32px] !hidden sm:!flex">
					<div class="i-carbon-trash-can text-base" />

					{#if canDelete}
						<span class="hidden sm:block" transition:fade
							>Delete</span>
					{/if}
				</button>
			{/if}
		{:else if onBucket || onSettings}
			<button
				on:click={() => handleGoBack()}
				class="btn h-8 w-8 !p-0"
				title="Home">
				<div class="i-carbon-home text-lg" />
			</button>
		{/if}
	</section>

	<section class="w-1/3justify-center flex">
		<a
			href="/protected-routes/home"
			class="heading text-base md:text-lg flex justify-center items-center gap-2">
			<div class="i-carbon-ibm-cloud-direct-link-2-connect text-xl" />
			JSON Bucket
		</a>
	</section>

	<section class="w-1/3 flex justify-end">
		<button
			on:click={() => handleGoToSettings()}
			class="group flex shrink-0 items-center relative">
			<span class="sr-only">Menu</span>
			<img
				alt="avatar"
				src={avatar_url}
				class="h-8 w-8 rounded-full object-cover" />

			<p class="ms-2 hidden text-left text-xs sm:block">
				<strong class="block font-medium">{name}</strong>

				<span class="opacity-60">{email}</span>
			</p>
		</button>
	</section>
</nav>

{#if onHome}
	<section class="flex sm:hidden p-2 gap-2">
		<input
			bind:value={$homeSearchTerm}
			type="text"
			class="input w-full h-8"
			placeholder="Search" />

		{#if $selectedBuckets.length > 0}
			<button
				transition:fade
				title="Delete bucket"
				on:click={() => handleDeleteBuckets()}
				class:delete-btn={canDelete}
				class="btn h-[32px]">
				<div class="i-carbon-trash-can text-base" />
			</button>
		{/if}
	</section>
{/if}
