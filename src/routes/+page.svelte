<script lang="ts">
	import { PUBLIC_DEMO_EMAIL, PUBLIC_DEMO_PW } from '$env/static/public'
	import { goto } from '$app/navigation'
	import type { Provider } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	import { toast } from 'svelte-sonner'

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

	const signInWithProvider = async (provider: Provider) => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: provider,
		})
		if (error) console.error(error)
	}

	async function signInWithDemo() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: PUBLIC_DEMO_EMAIL,
			password: PUBLIC_DEMO_PW,
		})

		if (error) {
			console.log(error)
			toast.error('Failed to log in with Demo User')
		}
	}
</script>

<section>
	<div class="lg:grid lg:min-h-screen lg:grid-cols-12">
		<aside
			class="relative block h-52 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
			<svg
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
						patternTransform="scale(3) rotate(65)"
						><rect
							x="0"
							y="0"
							width="100%"
							height="100%"
							fill="hsla(0, 0%, 100%, 0)" /><path
							d="M0 70.975V47.881m20-1.692L8.535 52.808v13.239L20 72.667l11.465-6.62V52.808zm0-32.95l11.465-6.62V-6.619L20-13.24 8.535-6.619V6.619L20 13.24m8.535 4.927v13.238L40 38.024l11.465-6.62V18.166L40 11.546zM20 36.333L0 47.88m0 0v23.094m0 0l20 11.548 20-11.548V47.88m0 0L20 36.333m0 0l20 11.549M0 11.547l-11.465 6.619v13.239L0 38.025l11.465-6.62v-13.24L0 11.548v-23.094l20-11.547 20 11.547v23.094M20 36.333V13.24"
							stroke-linecap="square"
							stroke-width="5"
							class="stroke-black/90 dark:stroke-white/90"
							fill="none" /></pattern
					></defs
				><rect
					width="800%"
					height="800%"
					transform="translate(0,-47.568)"
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

				<div class="p-5 flex flex-col gap-5 mt-5">
					<button
						class="btn demo-btn !text-xl w-full h-10 relative dark:!border-white/50 border-black/50"
						on:click={() => signInWithDemo()}>
						<svg
							class="w-8 sm:w-12 -translate-x-20 absolute left-1/2"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 71.09447588176465 22.345717748312723"
							width="71.09447588176465"
							height="22.345717748312723">
							<!-- svg-source:excalidraw -->

							<defs>
								<style class="style-fonts">
									@font-face {
										font-family: 'Virgil';
										src: url('https://excalidraw.com/Virgil.woff2');
									}
									@font-face {
										font-family: 'Cascadia';
										src: url('https://excalidraw.com/Cascadia.woff2');
									}
								</style>
							</defs>
							<g stroke-linecap="round"
								><g
									transform="translate(10.52326733767984 11.037657325061673) rotate(0 25.023970603202486 0.1352015490947167)"
									><path
										d="M-0.52 -1.04 C7.49 -1.04, 40.19 -0.26, 48.25 -0.16 M1.4 1.03 C9.79 1.24, 42.45 1.36, 50.57 1.29"
										class="stroke-black/90 dark:stroke-white/90"
										stroke-width="1"
										fill="none" /></g
								><g
									transform="translate(10.52326733767984 11.037657325061673) rotate(0 25.023970603202486 0.1352015490947167)"
									><path
										d="M25.83 8.45 C34.53 5.24, 41.26 6.1, 51.64 3.06 M28.31 10.46 C35.14 7.32, 42.65 3.46, 51.22 1.93"
										class="stroke-black/90 dark:stroke-white/90"
										stroke-width="1"
										fill="none" /></g
								><g
									transform="translate(10.52326733767984 11.037657325061673) rotate(0 25.023970603202486 0.1352015490947167)"
									><path
										d="M25.81 -8.31 C34.5 -6.25, 41.23 -0.13, 51.64 3.06 M28.29 -6.3 C35.27 -4.15, 42.79 -2.74, 51.22 1.93"
										class="stroke-black/90 dark:stroke-white/90"
										stroke-width="1"
										fill="none" /></g
								></g
							><mask /></svg>
						<span>Demo</span>
					</button>

					<div
						class="inline-flex items-center justify-center w-full relative">
						<hr class=" w-full h-px my-6 bg-nord-4" />
						<span
							class="px-6 -translate-x-1/2 absolute left-1/2 !bg-white dark:!bg-black">
							OR
						</span>
					</div>

					<button
						class="btn text-xl w-full h-10 github-btn"
						on:click={() => signInWithProvider('github')}>
						<div class="i-simple-icons-github text-lg" />
						Sign in with Github
					</button>
					<button
						class="btn text-xl w-full h-10 discord-btn"
						on:click={() => signInWithProvider('discord')}>
						<div class="i-simple-icons-discord text-lg" />
						Sign in with Discord
					</button>

					<button
						class="btn text-xl w-full h-10 google-btn"
						on:click={() => signInWithProvider('google')}>
						<img
							src="https://api.iconify.design/logos:google-icon.svg?color=%23030303"
							alt="Google Icon"
							class="w-[18px]" />
						<span>Sign in with Google</span>
					</button>
				</div>
			</div>
		</main>
	</div>
</section>

<style lang="postcss">
	.discord-btn {
		transition: all 0.2s ease-in-out;
		background-color: #7289da !important;
		border: #7289da !important;
		color: #fff !important;
	}
	.discord-btn:hover {
		background-color: #7983f5 !important;
		border: #7289da !important;
	}

	.github-btn {
		transition: all 0.2s ease-in-out;
		background-color: black !important;
		color: #fff !important;
	}
	.github-btn:hover {
		@apply !bg-black/90;
	}
	.google-btn {
		transition: all 0.2s ease-in-out;
		background-color: #fff !important;
		color: #000 !important;
	}
	.google-btn:hover {
		background-color: #f1f3f4 !important;
	}
	.demo-btn {
		@apply !text-black/90 dark:!text-white/90;
		font-family: 'Virgil', Segoe UI Emoji;
	}
</style>
