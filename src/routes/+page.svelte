<script lang="ts">
	import { goto } from '$app/navigation'
	import type { Provider } from '@supabase/supabase-js'
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

	const signInWithProvider = async (provider: Provider) => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: provider,
		})
		if (error) console.error(error)
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
					<svg
						class="flex self-center"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 225.19529755860572 97.94735221117736"
						width="225.19529755860572"
						height="97.94735221117736">
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
						<g
							transform="translate(11.855469067394779 62.94735221117736) rotate(0 101.66991424560547 12.5)"
							><text
								x="0"
								y="0"
								font-family="Virgil, Segoe UI Emoji"
								font-size="20px"
								class="!fill-black/90 dark:!fill-white/90"
								text-anchor="start"
								style="white-space: pre;"
								direction="ltr"
								dominant-baseline="text-before-edge"
								>Test user available!</text
							></g
						><g stroke-linecap="round"
							><g
								transform="translate(76.85546906739478 52.94735221117736) rotate(0 -33.186121161282074 -21.354576246440416)"
								><path
									d="M0.48 0.24 C-6.3 -1.95, -29.04 -5.95, -40.26 -13.15 C-51.48 -20.35, -62.53 -38.11, -66.86 -42.95 M-0.72 -0.68 C-7.72 -2.77, -30.73 -5.39, -41.35 -12.21 C-51.96 -19.03, -60.28 -36.26, -64.41 -41.6"
									class=" !stroke-black/90 dark:!stroke-white/90"
									stroke-width="1"
									fill="none" /></g
							><g
								transform="translate(76.85546906739478 52.94735221117736) rotate(0 -33.186121161282074 -21.354576246440416)"
								><path
									d="M-47.88 -29.83 C-55.61 -34.86, -59.04 -37.94, -63.03 -43.24 M-48.2 -28.91 C-52.26 -33.33, -56.91 -35.72, -64.04 -42.01"
									class=" !stroke-black/90 dark:!stroke-white/90"
									stroke-width="1"
									fill="none" /></g
							><g
								transform="translate(76.85546906739478 52.94735221117736) rotate(0 -33.186121161282074 -21.354576246440416)"
								><path
									d="M-59.5 -22.32 C-63.33 -29.92, -62.84 -35.52, -63.03 -43.24 M-59.82 -21.39 C-60.84 -27.67, -62.51 -31.99, -64.04 -42.01"
									class=" !stroke-black/90 dark:!stroke-white/90"
									stroke-width="1"
									fill="none" /></g
							></g
						><mask /></svg>
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
</style>
