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

<main class="flex flex-col justify-between h-[calc(100vh_-_57px)]">
	<section class="flex flex-col overflow-y-auto">
		{#each buckets as bucket}
			<a
				href={`/protected-routes/bucket/${bucket.id}`}
				class="flex gap-4 py-2 px-4 border border-t-0 hover:bg-gray-100">
				<span class="">{bucket.name}</span>
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
			href="https://github.com/Nico-Mayer"
			target="_blank">
			<div class="i-carbon-logo-github ml-4" />
		</a>
	</footer>
</main>
