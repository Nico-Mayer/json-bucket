<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import CodeMirror from 'svelte-codemirror-editor'
	import { json } from '@codemirror/lang-json'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	export let data

	let canDelete = false
	let _mounted = false
	let bucketID: string

	onMount(() => {
		bucketID = $page.params.id
		_mounted = true
	})

	$: ({ buckets } = data)
	$: currentBucket = buckets.find((bucket) => bucket.id === bucketID)

	const handleDeleteBucket = async () => {
		if (!currentBucket) return
		if (!canDelete) {
			canDelete = true

			setTimeout(() => {
				canDelete = false
			}, 3000)
			return
		}
	}

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
		<section class="flex justify-center items-center relative">
			<div class="i-carbon-tag absolute left-2 pointer-events-none" />
			<input
				class="input input-with-icon"
				type="text"
				bind:value={currentBucket.name} />
		</section>

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

			<button
				title="Delete bucket"
				class="btn"
				class:canDelete
				on:click={() => handleDeleteBucket()}>
				<div class="i-carbon-trash-can text-base" />

				{#if canDelete}
					<span transition:fade>Delete</span>
				{/if}
			</button>
		</section>
	</main>

	{#if _mounted}
		<CodeMirror bind:value={currentBucket.json_data} lang={json()} />
	{/if}
{/if}

<style scoped>
	.canDelete {
		@apply bg-red-600 border-red-600;

		color: white;
	}
	.canDelete:hover {
		@apply bg-red-500 border-red-500;
		color: white !important;
	}
</style>
