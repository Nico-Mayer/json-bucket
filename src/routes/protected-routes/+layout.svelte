<script lang="ts">
	import Navbar from '$lib/Navbar.svelte'

	export let data

	$: ({ session } = data)
</script>

<Navbar user_metadata={session?.user.user_metadata} />
<slot />
