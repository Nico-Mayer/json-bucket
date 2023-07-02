<script lang="ts">
	import { page } from '$app/stores'

	export let data

	let bucketID = $page.params.id

	$: ({ buckets } = data)
	$: currentBucket = buckets.find((bucket) => bucket.id === bucketID)
</script>

<main>
	{currentBucket?.name}
	{currentBucket?.id}
</main>
