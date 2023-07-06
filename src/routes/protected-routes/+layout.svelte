<script lang="ts">
	import Navbar from '$lib/Navbar.svelte'

	export let data

	$: ({ session } = data)
</script>

<Navbar {session} />
<slot />
