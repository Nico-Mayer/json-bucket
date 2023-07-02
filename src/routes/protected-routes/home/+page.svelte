<script lang="ts">
	import { invalidateAll } from '$app/navigation'

	export let data

	$: ({ buckets } = data)

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

	const handleDeleteBucket = async (bucketID: string) => {
		await fetch(`/protected-api/delete-bucket/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bucketID }),
		})

		await invalidateAll()
	}

	const handleUpdateBucket = async (newBucket: Bucket) => {
		await fetch(`/protected-api/update-bucket/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				newBucket,
			}),
		})

		await invalidateAll()
	}
</script>

<main class="flex flex-col justify-between h-[calc(100vh_-_57px)]">
	<section class="flex flex-col overflow-y-auto">
		{#each buckets as bucket}
			<a
				href={`/protected-routes/bucket/${bucket.id}`}
				class="flex gap-4 py-2 px-4 border border-t-0 hover:bg-gray-100 items-center justify-between">
				<div class="flex gap-5 items-center">
					<span class="font-medium">{bucket.name}</span>
					<span class="text-xs border px-2 rounded-full"
						>{formatTimestamp(bucket.last_changed)}</span>
				</div>

				<div class="i-carbon-caret-right h-full" />
			</a>
		{/each}
	</section>

	<footer
		class="w-full self-end justify-end items-center flex py-1 px-4 border-t font-extralight">
		<span class="text-xs align-middle">
			built by
			<a
				class="text-gray-400"
				target="_blank"
				href="https://nima94.vercel.app">@Nico-Mayer</a>
		</span>
		<a
			class="flex items-center justify-center"
			href="https://github.com/Nico-Mayer/json-bucket"
			target="_blank">
			<div class="i-carbon-logo-github ml-4" />
		</a>
	</footer>
</main>
