<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { onMount } from 'svelte'
	import { homeSearchTerm } from '$lib/stores/store'

	export let data

	$: ({ buckets } = data)

	$: filteredBuckets = buckets.filter((bucket) =>
		bucket.name.toLowerCase().includes($homeSearchTerm.toLowerCase())
	)

	onMount(() => {
		invalidateAll()
	})

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
	class="flex flex-col justify-between sm:h-[calc(100vh_-_57px)] h-[calc(100vh_-_113px)]">
	<section class="flex flex-col overflow-y-auto">
		{#each filteredBuckets as bucket}
			<button
				on:click={() => goto(`/protected-routes/bucket/${bucket.id}`)}
				class="flex gap-4 py-2 px-4 border-b hover:bg-secondaryLightHover dark:hover:bg-secondaryDarkHover items-center justify-between hover:text-black/90 hover:dark:text-white/90">
				<div class="flex gap-5 items-center">
					<span class="">{bucket.name}</span>
					<span class="badge"
						>{formatTimestamp(bucket.last_changed)}</span>
				</div>

				<div class="i-carbon-choose-item h-full" />
			</button>
		{/each}
		<!-- <div class="flex gap-4 py-2 px-4 border-b items-center justify-center">
			<button class="btn">
				<div class="i-carbon-add" />
				<span>New Bucket</span>
			</button>
		</div> -->
	</section>

	<footer
		class="w-full self-end justify-end items-center flex py-1 px-4 border-t font-light">
		<span class="text-xs align-middle mr-1"> built by </span>
		<a
			class="opacity-70 hover:opacity-100 transition-opacity duration-300 font-normal text-xs"
			target="_blank"
			href="https://nima94.vercel.app">@Nico-Mayer</a>
		<a
			class="flex items-center justify-center"
			href="https://github.com/Nico-Mayer/json-bucket"
			target="_blank">
			<div class="i-carbon-logo-github ml-4" />
		</a>
	</footer>
</main>
