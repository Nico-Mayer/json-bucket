<script lang="ts">
	import { goto } from '$app/navigation'
	import { selectedBuckets } from '$lib/stores/store'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { formatTimestamp } from '$lib/utils/utils'

	export let bucket: Bucket
	export let firstMount: boolean
	let container: HTMLElement

	onMount(() => {
		if (firstMount) return
		container.scrollIntoView({ behavior: 'instant', block: 'nearest' })
	})

	function selectBucket(id: string) {
		const isAlreadySelected = $selectedBuckets.includes(id)

		if (isAlreadySelected) {
			$selectedBuckets = $selectedBuckets.filter((item) => item !== id)
		} else {
			$selectedBuckets = [...$selectedBuckets, id]
		}
	}
</script>

<button
	bind:this={container}
	in:fly={{ x: -100, duration: 700 }}
	on:click={() => goto(`/protected-routes/bucket/${bucket.id}`)}
	class="transition-all duration-200 flex group gap-4 border-b hover:bg-secondaryLightHover dark:hover:bg-secondaryDarkHover items-center justify-between hover:text-black/90 hover:dark:text-white/90">
	<div class="flex items-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="pl-2 sm:pl-4 py-4 pr-5 flex items-center justify-center group text-base"
			on:click|stopPropagation={() => selectBucket(bucket.id)}>
			{#if $selectedBuckets.includes(bucket.id)}
				<div
					class="i-carbon-checkbox-checked transition-all duration-200" />
			{:else}
				<div
					class="i-carbon-checkbox opacity-50 group-hover:opacity-100 transition-all duration-200" />
			{/if}
		</div>

		<div class="flex gap-5 items-center">
			<span class="truncate">{bucket.name}</span>
			<span class="badge shrink-0">
				{formatTimestamp(bucket.last_changed)}
			</span>
		</div>
	</div>

	<div class="h-full mr-2 sm:mr-4 shrink-0 flex">
		<div
			class="self-center border-r flex pr-1 group-hover:p-0 !border-black/80 dark:!border-white/80 transition-all duration-200">
			<div class="i-carbon-arrow-right self-center" />
		</div>
	</div>
</button>
