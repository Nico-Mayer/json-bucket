<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import CodeMirror from 'svelte-codemirror-editor'
	import { json } from '@codemirror/lang-json'
	import { onMount } from 'svelte'

	export let data

	let _mounted = false
	let bucketID = $page.params.id

	onMount(() => {
		_mounted = true
	})

	$: ({ buckets } = data)
	$: currentBucket = buckets.find((bucket) => bucket.id === bucketID)

	const handleUpdateBucket = async () => {
		await fetch(`/protected-api/update-bucket/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				newBucket: currentBucket,
			}),
		})

		await invalidateAll()
	}
</script>

{#if currentBucket}
	<main class="py-2 px-4 flex justify-between border-b shadow-sm">
		<input class="input" type="text" bind:value={currentBucket.name} />

		<section class="flex gap-3">
			<button class="btn hover:bg-gray-200">RAW</button>
			<button
				class="btn hover:bg-gray-200"
				on:click={() => handleUpdateBucket()}>
				Save
			</button>
		</section>
	</main>

	{#if _mounted}
		<div class="w-full flex overflow-y-scroll h-[calc(100vh-130px)]">
			<CodeMirror bind:value={currentBucket.json_data} lang={json()} />
		</div>
	{/if}
{/if}
