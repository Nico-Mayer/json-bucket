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
		if (!currentBucket) return
		try {
			JSON.parse(currentBucket.json_data)
		} catch (e) {
			alert('Invalid JSON')
			return
		}

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

	const copyApiURL = () => {
		if (!currentBucket) return

		navigator.clipboard.writeText(
			`http://localhost:5173/public-api/bucket?bucketID=${currentBucket.id}`
		)
	}
</script>

{#if currentBucket}
	<main class="py-2 px-4 flex justify-between border-b">
		<input class="input" type="text" bind:value={currentBucket.name} />

		<section class="flex gap-3">
			<button
				title="Copy API URL"
				on:click={() => copyApiURL()}
				class="btn">
				<div class="i-carbon-copy text-base" />
				<span>API</span>
			</button>
			<button
				title="Save changes"
				class="btn"
				on:click={() => handleUpdateBucket()}>
				<div class="i-carbon-save text-base" />
				<span>Save</span>
			</button>
		</section>
	</main>

	{#if _mounted}
		<CodeMirror bind:value={currentBucket.json_data} lang={json()} />
	{/if}
{/if}