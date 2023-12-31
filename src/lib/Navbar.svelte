<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { homeSearchTerm, selectedBuckets } from '$lib/stores/store'
	import { createNewBucket, deleteBuckets } from '$lib/utils/supabase'
	import type { Session } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	import { toast } from 'svelte-sonner'
	import { fade } from 'svelte/transition'

	export let session: Session | null

	let _mounted = false
	let name: string
	let email: string
	let avatar_url: string
	let pathname: string = ''
	let canDelete = false

	onMount(() => {
		_mounted = true
	})

	$: {
		if (_mounted) {
			pathname = $page?.url?.pathname
		}
	}
	$: onHome = pathname?.startsWith('/protected-routes/home')
	$: onBucket = pathname?.startsWith('/protected-routes/bucket')
	$: onSettings = pathname?.startsWith('/protected-routes/settings')
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

	const handleCreateBucket = async () => {
		toast.promise(createNewBucket(), {
			loading: 'Creating new bucket...',
			success: () => {
				$homeSearchTerm = ''
				invalidateAll()
				return 'Bucket created!'
			},
			error: (data) => {
				return `${data}`
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

		const successString =
			$selectedBuckets.length > 1
				? `${$selectedBuckets.length} Buckets`
				: 'Bucket'

		if (canDelete) {
			toast.promise(deleteBuckets($selectedBuckets), {
				loading: 'Deleting buckets...',
				success: () => {
					canDelete = false
					$selectedBuckets = []
					invalidateAll()
					return successString + ' deleted!'
				},
				error: 'Could not delete buckets.',
			})
		}
	}
</script>

<nav
	class="w-full px-2 sm:px-4 py-3 flex justify-between border-b items-center sticky top-0">
	<section class="w-1/3 flex gap-2">
		{#if onHome}
			<button
				on:click={handleCreateBucket}
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
					on:click={handleDeleteBuckets}
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
			<a
				href="/protected-routes/home"
				class="btn h-8 w-8 !p-0"
				title="Home">
				<div class="i-carbon-home text-lg" />
			</a>
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
		<a
			href="/protected-routes/settings"
			class="group flex shrink-0 items-center relative">
			<span class="sr-only">Menu</span>
			<img
				loading="lazy"
				alt="avatar"
				src={avatar_url ??
					'https://api.iconify.design/material-symbols:account-circle.svg?color=%23878787'}
				class="h-8 w-8 rounded-full object-cover" />

			<p class="ms-2 hidden text-left text-xs sm:block">
				<strong class="block font-medium">{name ?? 'Tester'}</strong>

				<span class="opacity-60">{email ?? 'Tester@test.com'}</span>
			</p>
		</a>
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
				on:click={handleDeleteBuckets}
				class:delete-btn={canDelete}
				class="btn h-[32px]">
				<div class="i-carbon-trash-can text-base" />
			</button>
		{/if}
	</section>
{/if}
