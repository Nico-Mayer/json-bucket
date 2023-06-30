<script lang="ts">
	let shadow = false

	function toggleShadow() {
		shadow = !shadow
	}
</script>

<section class="flex flex-col m-auto space-y-10 items-center">
	<div
		class="rounded flex bg-nord-6 h-52 shadow-nord-15 w-52 dark:bg-nord-3 "
		class:shadow-xl={shadow}>
		<h1 class="font-bold m-auto">lean-kit</h1>
	</div>
	<button
		class="rounded flex bg-nord-5 h-10 p-2 w-10 gap-2 items-center dark:bg-nord-2"
		on:click={toggleShadow}>
		<div
			class="i-tabler-shadow animate__fast text-2xl"
			class:animate__wobble={shadow}
			class:animate__swing={!shadow}
			class:i-tabler-shadow-off={!shadow} />
		<!-- <iconify-icon
			icon=
			
			class="" /> -->
	</button>
</section>
