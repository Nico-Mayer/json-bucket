<script lag="ts">
	import { page } from '$app/stores'
</script>

<div class="grid h-screen px-4 bg-white dark:bg-black place-content-center">
	<div class="text-center">
		<h1 class="font-black opacity-20 text-9xl">{$page?.status}</h1>

		<p class="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</p>

		<p class="mt-4 opacity-60">We can't find that page.</p>

		<a href="/protected-routes/home" class="btn mt-4"> Go Back Home </a>
	</div>
</div>
