<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import GradualBlur from './GradualBlur.svelte';
	import { useImageBrightness } from './hooks/useImageBrightness.ts';
	import featuredData from '$lib/constants/featured-items.json' with { type: 'json' };

	const featuredItems = featuredData.items;

	let imgEl = $state<HTMLImageElement | null>(null);
	const analysis = useImageBrightness(() => imgEl);

	const overlayHeight = $derived($analysis?.brightness === 'light' ? '10rem' : '10rem');

	const textColor = $derived(
		$analysis?.brightness === 'light' ? 'text-neutral-800' : 'text-neutral-500'
	);

	const overlayBackground = $derived(
		$analysis
			? `linear-gradient(to top, ${$analysis.dominantColorDark} 0%, transparent 100%)`
			: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
	);

	const overlayOpacity = $derived($analysis?.brightness === 'light' ? 0.6 : 0.5);
	const overlayBlend = $derived($analysis?.brightness === 'light' ? 'screen' : 'multiply');
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	{#each featuredItems as featuredItem (featuredItem.featured_id)}
		<section class="relative overflow-hidden rounded-xl">
			<img
				alt={featuredItem.featured_game}
				src={featuredItem.featured_image_link}
				bind:this={imgEl}
				class="w-full"
				crossorigin="anonymous"
			/>
			<GradualBlur
				target="parent"
				position="bottom"
				height="15rem"
				strength={2}
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
			<div class="absolute right-0 bottom-10 left-0 z-20 mix-blend-plus-lighter">
				<div class="mx-10 flex flex-col text-center">
					<div class={textColor}>
						<h3 class="">Featured Game</h3>
						<h2 class="text-4xl leading-9 font-semibold">{featuredItem.featured_game}</h2>
					</div>

					<!-- <Separator class="my-2 opacity-50 mix-blend-plus-lighter" />
					<div class="mx-10 grid gap-1 text-start text-sm">
						{#each featuredItem.featured_details as detail (detail.featured_detail_id)}
							<div class="col-span-1 flex flex-col">
								{#if detail.featured_detail_header}
									<p class="text-xs font-bold text-neutral-700 uppercase">
										{detail.featured_detail_header}
									</p>
								{/if}
								<p class={textColor}>{detail.featured_detail_content}</p>
							</div>
						{/each}
					</div> -->
				</div>
			</div>
		</section>
	{/each}
</div>
