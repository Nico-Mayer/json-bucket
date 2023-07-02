<script lang="ts">
	import { invalidateAll } from '$app/navigation'

	export let data

	$: ({ session, buckets } = data)
	$: avatarURL = session?.user.user_metadata.avatar_url

	const handleCreateBucket = async () => {
		await fetch('/protected-api/new-bucket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		await invalidateAll()
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
</script>

<main>
	{session?.user.email}

	<img class="w-10 rounded-full" src={avatarURL} alt="avatar" />

	{#each buckets as bucket}
		<div class="flex gap-4">
			<span>{bucket.name}</span>
			<span>{bucket.id}</span>
			<button on:click={() => handleDeleteBucket(bucket.id)}>
				delete bucket
			</button>
		</div>
	{/each}

	<button on:click={handleCreateBucket}> create bucket </button>
</main>
