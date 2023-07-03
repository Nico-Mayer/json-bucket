<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data
	let { supabase } = data
	let _mounted = false

	onMount(() => {
		_mounted = true
	})

	$: ({ supabase } = data)
	$: if (data.session) {
		if (_mounted) {
			goto('/protected-routes/home')
		}
	}

	const signInWithGithub = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
		})
		if (error) console.log(error)
	}
</script>

<section>
	<div class="lg:grid lg:min-h-screen lg:grid-cols-12">
		<aside
			class="relative block h-52 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
			<svg
				class="absolute inset-0 h-full w-full object-cover"
				id="patternId"
				width="100%"
				height="100%"
				xmlns="http://www.w3.org/2000/svg"
				><defs
					><pattern
						id="a"
						patternUnits="userSpaceOnUse"
						width="40"
						height="59.428"
						patternTransform="scale(3) rotate(105)"
						><rect
							x="0"
							y="0"
							width="100%"
							height="100%"
							fill="hsla(42, 0%, 100%, 1)" /><path
							d="M0 70.975V47.881m20-1.692L8.535 52.808v13.239L20 72.667l11.465-6.62V52.808zm0-32.95l11.465-6.62V-6.619L20-13.24 8.535-6.619V6.619L20 13.24m8.535 4.927v13.238L40 38.024l11.465-6.62V18.166L40 11.546zM20 36.333L0 47.88m0 0v23.094m0 0l20 11.548 20-11.548V47.88m0 0L20 36.333m0 0l20 11.549M0 11.547l-11.465 6.619v13.239L0 38.025l11.465-6.62v-13.24L0 11.548v-23.094l20-11.547 20 11.547v23.094M20 36.333V13.24"
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="6"
							class="stroke-black/90 dark:stroke-white/90"
							fill="none" /></pattern
					></defs
				><rect
					width="800%"
					height="800%"
					transform="translate(0,0)"
					fill="url(#a)" /></svg>
		</aside>

		<main
			class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
			<div class="max-w-xl lg:max-w-3xl">
				<a class="block" href="/">
					<span class="sr-only">Home</span>
					<div
						class="i-carbon-ibm-cloud-direct-link-2-connect text-6xl" />
				</a>

				<h1 class="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
					JSON Bucket
				</h1>

				<p class="mt-4 leading-relaxed opacity-60">
					Effortlessly store your JSON data and seamlessly access it
					anywhere through generated API routes.
				</p>

				<button class="btn mt-4 text-xl" on:click={signInWithGithub}>
					<div class="i-simple-icons-github" />
					Sign in with Github
				</button>
			</div>
		</main>
	</div>
</section>
