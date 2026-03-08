<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	type Position = 'top' | 'bottom' | 'left' | 'right';
	type Curve = 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
	type Preset =
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'subtle'
		| 'intense'
		| 'smooth'
		| 'sharp'
		| 'header'
		| 'footer'
		| 'sidebar'
		| 'page-header'
		| 'page-footer';

	type Props = {
		position?: Position;
		strength?: number;
		height?: string;
		width?: string;
		divCount?: number;
		exponential?: boolean;
		zIndex?: number;
		animated?: boolean | 'scroll';
		duration?: string;
		easing?: string;
		opacity?: number;
		curve?: Curve;
		responsive?: boolean;
		mobileHeight?: string;
		tabletHeight?: string;
		desktopHeight?: string;
		mobileWidth?: string;
		tabletWidth?: string;
		desktopWidth?: string;
		preset?: Preset;
		hoverIntensity?: number;
		target?: 'parent' | 'page';
		onAnimationComplete?: () => void;
		class?: string;
		style?: string;
		children?: Snippet;
	};

	let {
		position,
		strength,
		height,
		width,
		divCount,
		exponential,
		zIndex,
		animated,
		duration,
		easing,
		opacity,
		curve,
		responsive,
		mobileHeight,
		tabletHeight,
		desktopHeight,
		mobileWidth,
		tabletWidth,
		desktopWidth,
		preset,
		hoverIntensity,
		target,
		onAnimationComplete,
		class: className = '',
		style: styleProp = '',
		children
	}: Props = $props();

	// ─── Presets ────────────────────────────────────────────────────────────────

	const PRESETS: Record<string, Partial<Props>> = {
		top: { position: 'top', height: '6rem' },
		bottom: { position: 'bottom', height: '6rem' },
		left: { position: 'left', height: '6rem' },
		right: { position: 'right', height: '6rem' },
		subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
		intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
		smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
		sharp: { height: '5rem', curve: 'linear', divCount: 4 },
		header: { position: 'top', height: '8rem', curve: 'ease-out' },
		footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
		sidebar: { position: 'left', height: '6rem', strength: 2.5 },
		'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
		'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
	};

	const CURVE_FUNCTIONS: Record<Curve, (p: number) => number> = {
		linear: (p) => p,
		bezier: (p) => p * p * (3 - 2 * p),
		'ease-in': (p) => p * p,
		'ease-out': (p) => 1 - Math.pow(1 - p, 2),
		'ease-in-out': (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
	};

	const round1 = (n: number) => Math.round(n * 10) / 10;

	// ─── Resolved config (preset → defaults → props) ────────────────────────────

	const config = $derived.by(() => {
		const p = preset ? (PRESETS[preset] ?? {}) : {};
		return {
			position: position ?? p.position ?? ('bottom' as Position),
			strength: strength ?? p.strength ?? 2,
			height: height ?? p.height ?? '6rem',
			width: width ?? p.width,
			divCount: divCount ?? p.divCount ?? 5,
			exponential: exponential ?? p.exponential ?? false,
			zIndex: zIndex ?? p.zIndex ?? 1000,
			animated: animated ?? p.animated ?? false,
			duration: duration ?? p.duration ?? '0.3s',
			easing: easing ?? p.easing ?? 'ease-out',
			opacity: opacity ?? p.opacity ?? 1,
			curve: curve ?? p.curve ?? ('linear' as Curve),
			responsive: responsive ?? p.responsive ?? false,
			target: target ?? p.target ?? ('parent' as const),
			hoverIntensity: hoverIntensity ?? p.hoverIntensity
		};
	});

	// ─── Responsive dimensions ───────────────────────────────────────────────────

	let windowWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1024);

	onMount(() => {
		const handler = () => {
			windowWidth = window.innerWidth;
		};
		window.addEventListener('resize', handler);
		return () => window.removeEventListener('resize', handler);
	});

	const responsiveHeight = $derived.by(() => {
		if (!config.responsive) return config.height;
		if (windowWidth <= 480 && mobileHeight) return mobileHeight;
		if (windowWidth <= 768 && tabletHeight) return tabletHeight;
		if (windowWidth <= 1024 && desktopHeight) return desktopHeight;
		return config.height;
	});

	const responsiveWidth = $derived.by(() => {
		if (!config.responsive) return config.width;
		if (windowWidth <= 480 && mobileWidth) return mobileWidth;
		if (windowWidth <= 768 && tabletWidth) return tabletWidth;
		if (windowWidth <= 1024 && desktopWidth) return desktopWidth;
		return config.width;
	});

	// ─── Hover ───────────────────────────────────────────────────────────────────

	let isHovered = $state(false);

	// ─── Intersection Observer (animated='scroll') ───────────────────────────────

	let containerEl = $state<HTMLDivElement | null>(null);
	let isVisible = $state(false);

	$effect(() => {
		if (config.animated !== 'scroll') {
			isVisible = true;
		}
	});

	$effect(() => {
		if (config.animated !== 'scroll' || !containerEl) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);
		observer.observe(containerEl);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (!isVisible || config.animated !== 'scroll' || !onAnimationComplete) return;
		const ms = parseFloat(config.duration) * 1000;
		const t = setTimeout(onAnimationComplete, ms);
		return () => clearTimeout(t);
	});

	// ─── Blur divs ───────────────────────────────────────────────────────────────

	type BlurDiv = { key: number; style: string };

	const blurDivs = $derived.by((): BlurDiv[] => {
		const divs: BlurDiv[] = [];
		const increment = 100 / config.divCount;
		const currentStrength =
			isHovered && config.hoverIntensity
				? config.strength * config.hoverIntensity
				: config.strength;

		const curveFunc = CURVE_FUNCTIONS[config.curve] ?? CURVE_FUNCTIONS.linear;

		const directionMap: Record<string, string> = {
			top: 'to top',
			bottom: 'to bottom',
			left: 'to left',
			right: 'to right'
		};
		const direction = directionMap[config.position] ?? 'to bottom';

		for (let i = 1; i <= config.divCount; i++) {
			let progress = i / config.divCount;
			progress = curveFunc(progress);

			const blurValue = config.exponential
				? Math.pow(2, progress * 4) * 0.0625 * currentStrength
				: 0.0625 * (progress * config.divCount + 1) * currentStrength;

			const p1 = round1(increment * i - increment);
			const p2 = round1(increment * i);
			const p3 = round1(increment * i + increment);
			const p4 = round1(increment * i + increment * 2);

			let gradient = `transparent ${p1}%, black ${p2}%`;
			if (p3 <= 100) gradient += `, black ${p3}%`;
			if (p4 <= 100) gradient += `, transparent ${p4}%`;

			const mask = `linear-gradient(${direction}, ${gradient})`;
			const transition =
				config.animated && config.animated !== 'scroll'
					? `backdrop-filter ${config.duration} ${config.easing}`
					: '';

			divs.push({
				key: i,
				style: [
					`mask-image: ${mask}`,
					`-webkit-mask-image: ${mask}`,
					`backdrop-filter: blur(${blurValue.toFixed(3)}rem)`,
					`opacity: ${config.opacity}`,
					transition ? `transition: ${transition}` : ''
				]
					.filter(Boolean)
					.join('; ')
			});
		}
		return divs;
	});

	// ─── Container style ─────────────────────────────────────────────────────────

	const containerStyle = $derived.by(() => {
		const isVertical = config.position === 'top' || config.position === 'bottom';
		const isHorizontal = config.position === 'left' || config.position === 'right';
		const isPage = config.target === 'page';

		const parts: string[] = [
			`position: ${isPage ? 'fixed' : 'absolute'}`,
			`pointer-events: ${config.hoverIntensity ? 'auto' : 'none'}`,
			`opacity: ${isVisible ? 1 : 0}`,
			`z-index: ${isPage ? config.zIndex + 100 : config.zIndex}`,
			config.animated ? `transition: opacity ${config.duration} ${config.easing}` : ''
		];

		if (isVertical) {
			parts.push(`height: ${responsiveHeight}`);
			parts.push(`width: ${responsiveWidth ?? '100%'}`);
			parts.push(`${config.position}: 0`);
			parts.push('left: 0', 'right: 0');
		} else if (isHorizontal) {
			parts.push(`width: ${responsiveWidth ?? responsiveHeight}`);
			parts.push('height: 100%');
			parts.push(`${config.position}: 0`);
			parts.push('top: 0', 'bottom: 0');
		}

		if (styleProp) parts.push(styleProp);

		return parts.filter(Boolean).join('; ');
	});

	const isPage = $derived(config.target === 'page');
</script>

<div
	bind:this={containerEl}
	class="gradual-blur relative isolate rounded-xl {isPage
		? 'gradual-blur-page'
		: 'gradual-blur-parent'} {className}"
	style={containerStyle}
>
	<div class="relative h-full w-full rounded-xl">
		{#each blurDivs as div (div.key)}
			<div class="absolute inset-0" style={div.style}></div>
		{/each}
	</div>
	{#if children}
		<div class="relative rounded-xl">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.gradual-blur {
		pointer-events: none;
		transition: opacity 0.3s ease-out;
	}
</style>
