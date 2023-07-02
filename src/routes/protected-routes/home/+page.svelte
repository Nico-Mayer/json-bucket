<script lang="ts">
	import { invalidateAll } from '$app/navigation'

	export let data

	$: ({ buckets } = data)

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

<main>
	{#each buckets as bucket}
		<a
			href={`/protected-routes/bucket/${bucket.id}`}
			class="flex gap-4 py-2 px-4 border border-t-0 hover:bg-gray-200">
			<span class="font-semibold">{bucket.name}</span>
		</a>
	{/each}
</main>
