<script lang="ts">
	import Navbar from '../Navbar.svelte'
	import { Toaster } from 'svelte-french-toast'

	export let data
	$: ({ session } = data)
</script>

<Navbar user_metadata={session?.user.user_metadata} />
<slot />
<Toaster />
