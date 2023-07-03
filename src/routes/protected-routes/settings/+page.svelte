<script lang="ts">
	import type { UserMetadata } from '@supabase/supabase-js'

	export let data

	let user_metadata: UserMetadata

	$: ({ session } = data)
	$: if (session) {
		user_metadata = session?.user?.user_metadata
	}
</script>

{#if user_metadata}
	<main class="flex w-full justify-center items-center p-5">
		<div class="max-w-7xl w-full border p-2 flex flex-col gap-4">
			<section>
				<h1 class="text-xl font-semibold">Profile</h1>

				<div class="flex flex-col">
					<label for="name">Name</label>
					<input
						name="name"
						class="input"
						type="text"
						bind:value={user_metadata.name} />
				</div>
			</section>
			<section>
				<h1 class="text-xl font-semibold">Appearance</h1>
			</section>
		</div>
	</main>
{/if}
