<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import CodeMirror from 'svelte-codemirror-editor'
	import { json } from '@codemirror/lang-json'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { toast } from 'svelte-french-toast'

	export let data

	let _mounted = false
	let canDelete = false
	let bucketID: string
	let validJSON: boolean = true

	onMount(() => {
		bucketID = $page.params.id
		_mounted = true
	})

	$: ({ buckets } = data)
	$: currentBucket = buckets.find((bucket) => bucket.id === bucketID)

	$: if (_mounted && currentBucket) {
		try {
			JSON.parse(currentBucket.json_data)
			validJSON = true
		} catch (e) {
			validJSON = false
		}
	}

	const handleDeleteBucket = async () => {
		if (!currentBucket) return
		if (!canDelete) {
			canDelete = true

			setTimeout(() => {
				canDelete = false
			}, 5000)
			return
		}

		if (canDelete) {
			await fetch(`/protected-api/delete-bucket/`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ bucketID }),
			})
			canDelete = false
			goto('/protected-routes/home')
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

		await toast.promise(
			saveBucket(),
			{
				loading: 'Saving...',
				success: 'Changes saved!',
				error: 'Could not save.',
			},
			{
				position: 'bottom-right',
			}
		)

		await invalidateAll()
	}

	async function saveBucket() {
		const res = await fetch(`/protected-api/update-bucket/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				newBucket: currentBucket,
			}),
		})

		return res
	}

	const copyApiURL = () => {
		if (!currentBucket) return

		navigator.clipboard.writeText(
			`http://localhost:5173/public-api/bucket?bucketID=${currentBucket.id}`
		)

		toast.success('Copied API URL!', {
			position: 'bottom-right',
		})
	}
</script>

{#if currentBucket}
	<main class="p-2 sm:px-4 flex justify-between border-b">
		<section class="flex justify-center items-center relative">
			<div
				class="i-carbon-tag absolute left-2 pointer-events-none hidden sm:block" />
			<input
				class="input input-with-icon"
				type="text"
				bind:value={currentBucket.name} />
		</section>

		<section class="flex gap-3 items-center">
			{#if !validJSON}
				<div
					transition:fade
					class="badge !border-yellow-500 !text-yellow-500 hidden sm:block">
					Invalid JSON
				</div>

				<div class="i-carbon-error flex text-yellow-500 sm:hidden" />
			{/if}

			<button
				title="Copy API URL"
				on:click={() => copyApiURL()}
				class="btn h-[30px]">
				<div class="i-carbon-copy text-base" />
				<span class="hidden sm:block">API</span>
			</button>
			<button
				disabled={!validJSON}
				class:disabled={!validJSON}
				title="Save changes"
				class="btn h-[30px]"
				on:click={() => handleUpdateBucket()}>
				<div class="i-carbon-save text-base" />
				<span class="hidden sm:block">Save</span>
			</button>

			<button
				title="Delete bucket"
				class="btn h-[30px]"
				class:canDelete
				on:click={() => handleDeleteBucket()}>
				<div class="i-carbon-trash-can text-base" />

				{#if canDelete}
					<span class="hidden sm:block" transition:fade>Delete</span>
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
		@apply bg-red-400 border-red-400;
		color: white;
	}
	.canDelete:hover {
		@apply bg-red-500 border-red-500;
		color: white !important;
	}
	.disabled {
		@apply opacity-50;
		pointer-events: none;
	}
</style>
