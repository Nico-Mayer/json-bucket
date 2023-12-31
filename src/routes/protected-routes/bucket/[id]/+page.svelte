<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { PUBLIC_API_URL } from '$env/static/public'
	import { saveBucket, deleteBuckets } from '$lib/utils/supabase'
	import { json, jsonParseLinter } from '@codemirror/lang-json'
	import { lintGutter, linter } from '@codemirror/lint'
	import { onMount } from 'svelte'
	import CodeMirror from 'svelte-codemirror-editor'
	import { toast } from 'svelte-sonner'
	import { fade } from 'svelte/transition'

	export let data

	let initialBucket: Bucket | undefined
	let _mounted = false
	let canDelete = false
	let canUpdate = false
	let bucketID: string
	let validJSON: boolean = true
	let validName: boolean = true
	let unsavedChanges: boolean = false
	let cooldownTimer: NodeJS.Timeout
	let showCopySuccessIcon = false

	onMount(() => {
		bucketID = $page.params.id
		initialBucket = {
			...buckets.find((bucket) => bucket.id === bucketID),
		} as Bucket
		_mounted = true
	})

	$: ({ buckets } = data)
	$: {
		clearTimeout(cooldownTimer)
		cooldownTimer = setTimeout(() => {
			if (_mounted && canUpdate && unsavedChanges) {
				handleUpdateBucket()
			}
		}, 1000)
	}
	$: if (_mounted && currentBucket && initialBucket) {
		const currentBucketString = JSON.stringify(currentBucket)
		const initialBucketString = JSON.stringify(initialBucket)
		unsavedChanges = currentBucketString !== initialBucketString
	}
	$: currentBucket = buckets.find((bucket) => bucket.id === bucketID)
	$: if (_mounted && currentBucket) {
		try {
			JSON.parse(currentBucket.json_data)
			validJSON = true
		} catch (e) {
			validJSON = false
		}
	}
	$: if (_mounted && currentBucket) {
		validName =
			currentBucket.name.length > 0 && currentBucket.name.length < 32
	}
	$: if (_mounted && currentBucket) {
		canUpdate = validJSON && validName
	}

	function handleFormat() {
		if (!currentBucket) return
		try {
			const formattedJSON = JSON.stringify(
				JSON.parse(currentBucket.json_data),
				null,
				2
			)
			currentBucket.json_data = formattedJSON
			toast.success('JSON formatted!')
		} catch (e) {
			toast.error('Could not format JSON.')
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 's') {
			event.preventDefault()
			handleUpdateBucket()
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
			event.preventDefault()
			handleFormat()
		}
	}

	async function handleDeleteBucket() {
		if (!currentBucket) return
		if (!canDelete) {
			canDelete = true

			setTimeout(() => {
				canDelete = false
			}, 5000)
			return
		}

		if (canDelete) {
			deleteBuckets([bucketID])

			canDelete = false

			toast.error('Bucket deleted!')

			goto('/protected-routes/home')
		}
	}

	async function handleUpdateBucket() {
		if (!canUpdate) return
		if (!currentBucket) return

		if (!unsavedChanges) {
			toast.success('Bucket is up to date!')
			return
		}

		toast.promise(saveBucket(currentBucket), {
			loading: 'Saving...',
			success: () => {
				initialBucket = {
					...buckets.find((bucket) => bucket.id === bucketID),
				} as Bucket
				return 'Changes saved!'
			},
			error: 'Could not save.',
		})
	}

	async function copyApiURL() {
		if (!currentBucket) return
		showCopySuccessIcon = true
		navigator.clipboard.writeText(
			`${PUBLIC_API_URL}/bucket?bucketID=${currentBucket.id}`
		)
		setTimeout(() => {
			showCopySuccessIcon = false
		}, 2000)
		toast.success('Copied to clipboard!')
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if currentBucket}
	<main class="p-2 sm:px-4 flex justify-between border-b">
		<section class="flex justify-center items-center relative">
			<div
				class="i-carbon-tag text-sm absolute left-3 pointer-events-none hidden sm:block opacity-80"
				class:!text-yellow-500={!validName} />
			<input
				minlength="1"
				class="input input-with-icon"
				class:!border-yellow-500={!validName}
				type="text"
				bind:value={currentBucket.name} />
		</section>

		<section class="flex gap-2 sm:gap-3 items-center">
			{#if unsavedChanges}
				<div
					transition:fade
					class="badge badge-warning hidden sm:block">
					Unsaved changes
				</div>
			{/if}

			{#if !validJSON}
				<div
					transition:fade
					class="badge badge-warning hidden sm:block">
					Invalid JSON
				</div>
			{/if}

			<button
				title="Copy API URL"
				on:click={copyApiURL}
				class="btn h-[30px]">
				{#if showCopySuccessIcon}
					<div in:fade class="i-carbon-checkmark text-base" />
				{:else}
					<div in:fade class="i-carbon-copy text-base" />
				{/if}

				<span class="hidden sm:block">API</span>
			</button>
			<button
				disabled={!canUpdate}
				class:disabled={!canUpdate}
				title="Format JSON | ctrl + b"
				class="btn h-[30px]"
				on:click={handleFormat}>
				<div class="i-carbon-data-1 text-base" />
				<span class="hidden sm:block">Format</span>
			</button>

			<button
				disabled={!canUpdate}
				class:disabled={!canUpdate}
				title="Save changes | ctrl + s"
				class="btn h-[30px]"
				on:click={handleUpdateBucket}>
				<div class="i-carbon-save text-base" />
				<span class="hidden sm:block">Save</span>
			</button>

			<button
				title="Delete bucket"
				class="btn h-[30px]"
				class:delete-btn={canDelete}
				on:click={handleDeleteBucket}>
				<div class="i-carbon-trash-can text-base" />

				{#if canDelete}
					<span class="hidden sm:block" transition:fade>Delete</span>
				{/if}
			</button>
		</section>
	</main>

	{#if _mounted}
		<CodeMirror
			bind:value={currentBucket.json_data}
			lang={json()}
			extensions={[lintGutter(), linter(jsonParseLinter())]} />
	{/if}
{/if}

<style scoped>
	.disabled {
		@apply opacity-50;
		pointer-events: none;
	}
</style>
