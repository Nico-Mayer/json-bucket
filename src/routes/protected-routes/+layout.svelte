<script lang="ts">
	import { activeTheme } from '$lib/stores/store'
	import Navbar from '../Navbar.svelte'
	import { Toaster } from 'svelte-sonner'

	export let data

	$: ({ session } = data)
</script>

<Navbar user_metadata={session?.user.user_metadata} />
<slot />
<Toaster
	richColors={false}
	position="bottom-right"
	theme={$activeTheme}
	closeButton />
