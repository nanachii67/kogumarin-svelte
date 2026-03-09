<script lang="ts">
	// import Separator from '$lib/components/ui/separator/separator.svelte';
	import GradualBlur from './GradualBlur.svelte';
	import { useImageBrightness } from './hooks/useImageBrightness.ts';
	import playlistData from '$lib/constants/apple-music-items.json' with { type: 'json' };

	const playlistItems = playlistData.items;

	let imgEl = $state<HTMLImageElement | null>(null);
	const analysis = useImageBrightness(() => imgEl);

	const overlayHeight = $derived($analysis?.brightness === 'light' ? '10rem' : '10rem');

	// const textColor = $derived(
	// 	$analysis?.brightness === 'light' ? 'text-neutral-800' : 'text-neutral-500'
	// );

	const overlayBackground = $derived(
		$analysis
			? `linear-gradient(to top, ${$analysis.dominantColorDark} 0%, transparent 100%)`
			: 'linear-gradient(to top, rgba(0,0,0,1), transparent)'
	);

	const overlayOpacity = $derived($analysis?.brightness === 'light' ? 0.6 : 0.5);
	const overlayBlend = $derived($analysis?.brightness === 'light' ? 'screen' : 'multiply');
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
	{#each playlistItems as playlist (playlist.playlist_id)}
		<div class="relative overflow-hidden rounded-xl">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={playlist.playlist_am_link}>
				<img
					alt={playlist.playlist_name}
					src={playlist.playlist_image_link}
					bind:this={imgEl}
					crossorigin="anonymous"
					class="w-90"
				/>
				<GradualBlur
					target="parent"
					position="bottom"
					height="8rem"
					strength={1}
					divCount={4}
					curve="bezier"
					exponential={false}
					opacity={1}
					zIndex={10}
				/>
				<div
					class="absolute right-0 bottom-0 left-0 rounded-b-xl"
					style="
				z-index: 15;
				height: {overlayHeight};
				background: {overlayBackground};
				opacity: {overlayOpacity};
				mix-blend-mode: {overlayBlend};
			"
				></div>
				<div class="absolute right-0 bottom-0 left-0 z-20 -translate-y-5 mix-blend-plus-lighter">
					<div class="mx-10 flex flex-col text-start">
						<div>
							<h2 class="text-3xl leading-7 font-medium text-neutral-300">
								{playlist.playlist_name}
							</h2>
							<h3 class="text-sm text-neutral-400">{playlist.playlist_index}</h3>
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>
