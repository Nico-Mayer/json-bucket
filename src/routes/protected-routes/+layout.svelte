<script lang="ts">
	import { activeTheme } from '$lib/stores/store'
	import Navbar from '$lib/Navbar.svelte'
	import { Toaster } from 'svelte-sonner'

	export let data

	$: ({ session } = data)
</script>

<Navbar user_metadata={session?.user.user_metadata} />
<slot />
<Toaster
	toastOptions={{
		class: 'my-toast',
	}}
	richColors={false}
	position="bottom-right"
	theme={$activeTheme} />
