<script lang="ts">
	import Footer from '$lib/Footer.svelte'
	import { goto, invalidateAll } from '$app/navigation'
	import { onMount } from 'svelte'
	import { homeSearchTerm, selectedBuckets } from '$lib/stores/store'
	import { toast } from 'svelte-sonner'

	export let data

	$: ({ buckets } = data)

	$: filteredBuckets = buckets.filter((bucket) =>
		bucket.name.toLowerCase().includes($homeSearchTerm.toLowerCase())
	)

	onMount(() => {
		invalidateAll()
	})

	async function handleCreateBucket() {
		toast.promise(createNewBucket(), {
			loading: 'Creating new bucket...',
			success: 'Bucket created!',
			error: 'Could not create bucket.',
		})
	}

	async function createNewBucket() {
		await fetch('/protected-api/new-bucket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		$homeSearchTerm = ''
		await invalidateAll()
	}

	function selectBucket(id: string) {
		const isAlreadySelected = $selectedBuckets.includes(id)

		if (isAlreadySelected) {
			$selectedBuckets = $selectedBuckets.filter((item) => item !== id)
		} else {
			$selectedBuckets = [...$selectedBuckets, id]
		}
	}

	function formatTimestamp(timestamp: Date) {
		const date = new Date(timestamp)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')

		const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}`
		return formattedTimestamp
	}
</script>

<main
	class="flex flex-col justify-between sm:h-[calc(100vh_-_57px)] h-[calc(100vh_-_105px)]">
	<section class="flex flex-col overflow-y-auto">
		{#each filteredBuckets as bucket}
			<button
				on:click={() => goto(`/protected-routes/bucket/${bucket.id}`)}
				class="flex gap-4 border-b hover:bg-secondaryLightHover dark:hover:bg-secondaryDarkHover items-center justify-between hover:text-black/90 hover:dark:text-white/90">
				<div class="flex items-center">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="pl-2 sm:pl-4 py-4 pr-5 flex items-center justify-center group text-base"
						on:click|stopPropagation={() =>
							selectBucket(bucket.id)}>
						{#if $selectedBuckets.includes(bucket.id)}
							<div class="i-carbon-checkbox-checked" />
						{:else}
							<div
								class="i-carbon-checkbox opacity-50 group-hover:opacity-100" />
						{/if}
					</div>

					<div class="flex gap-5 items-center">
						<span class="">{bucket.name}</span>
						<span class="badge"
							>{formatTimestamp(bucket.last_changed)}</span>
					</div>
				</div>

				<div class="i-carbon-choose-item h-full mr-2 sm:mr-4" />
			</button>
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
					Create Bucket
				</button>
			</div>
		</div>
	{/if}
	<Footer />
</main>
