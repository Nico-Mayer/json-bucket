<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import Footer from '$lib/Footer.svelte'
	import HomeListItem from '$lib/HomeListItem.svelte'
	import { homeSearchTerm } from '$lib/stores/store'
	import { createNewBucket } from '$lib/utils/supabase'
	import { afterUpdate, onMount } from 'svelte'
	import { toast } from 'svelte-sonner'

	export let data
	let firstMount = true
	let homeListContainer: HTMLElement

	$: ({ buckets } = data)

	$: filteredBuckets = buckets.filter((bucket) =>
		bucket.name.toLowerCase().includes($homeSearchTerm.toLowerCase())
	)

	onMount(() => {
		invalidateAll()
		homeListContainer.scrollTop = -homeListContainer.scrollHeight
	})
	afterUpdate(() => {
		firstMount = false
	})

	async function handleCreateBucket() {
		toast.promise(createNewBucket(), {
			loading: 'Creating new bucket...',
			success: () => {
				$homeSearchTerm = ''
				invalidateAll()
				return 'Bucket created!'
			},
			error: 'Could not create bucket.',
		})
	}
</script>

<main
	class="flex flex-col justify-between sm:h-[calc(100vh_-_57px)] h-[calc(100vh_-_105px)]">
	<section
		bind:this={homeListContainer}
		class="flex flex-col-reverse overflow-y-auto">
		{#each filteredBuckets as bucket}
			<HomeListItem {bucket} {firstMount} />
		{/each}
	</section>
	{#if buckets.length <= 0}
		<div
			class="w-full h-full flex flex-col justify-center items-center p-10">
			<div class="flex flex-col gap-4 justify-center items-center mb-10">
				<div
					class="opacity-10 felx flex-col items-center justify-center font-bold">
					<div class="text-2xl md:text-4xl">
						Create your first bucket
					</div>
				</div>
				<button on:click={handleCreateBucket} class="btn">
					Create bucket
				</button>
			</div>
		</div>
	{/if}
	<Footer />
</main>
