<script lag="ts">
	import { page } from '$app/stores'
</script>

<div class="grid h-screen px-4 bg-white place-content-center">
	<div class="text-center">
		<h1 class="font-black text-gray-200 text-9xl">{$page?.status}</h1>

		<p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
			Uh-oh!
		</p>

		<p class="mt-4 text-gray-500">We can't find that page.</p>

		<a href="/" class="btn mt-4"> Go Back Home </a>
	</div>
</div>
