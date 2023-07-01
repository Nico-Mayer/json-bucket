<script lang="ts">
	export let data

	let { session, buckets } = data

	$: avatarURL = session?.user.user_metadata.avatar_url
</script>

<main>
	{session?.user.email}

	<img class="w-10 rounded-full" src={avatarURL} alt="avatar" />

	{#each buckets as bucket}
		<div>
			{bucket.name}
		</div>
	{/each}
</main>
