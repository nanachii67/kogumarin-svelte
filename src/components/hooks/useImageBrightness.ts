// hooks/useImageBrightness.ts
import { readable } from 'svelte/store';

export type ImageAnalysis = {
	brightness: 'dark' | 'light';
	dominantColor: string; // e.g. "rgb(120, 80, 160)"
	dominantColorDark: string; // darkened version for scrim
};

export type SampleRegion = 'bottom' | 'top' | 'full';

function analyse(img: HTMLImageElement, sampleRegion: SampleRegion): ImageAnalysis {
	try {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('No canvas context');

		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		ctx.drawImage(img, 0, 0);

		const regionHeight = Math.floor(canvas.height * 0.25);
		const startY =
			sampleRegion === 'bottom' ? canvas.height - regionHeight : sampleRegion === 'top' ? 0 : 0;
		const sampleH = sampleRegion === 'full' ? canvas.height : regionHeight;

		const { data } = ctx.getImageData(0, startY, canvas.width, sampleH);

		let r = 0,
			g = 0,
			b = 0,
			count = 0;
		for (let i = 0; i < data.length; i += 4 * 10) {
			r += data[i];
			g += data[i + 1];
			b += data[i + 2];
			count++;
		}

		r = Math.round(r / count);
		g = Math.round(g / count);
		b = Math.round(b / count);

		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
		const isDark = luminance < 128;

		const avg = (r + g + b) / 3;
		const saturationBoost = 2;
		const sr = Math.min(255, Math.round(avg + (r - avg) * saturationBoost));
		const sg = Math.min(255, Math.round(avg + (g - avg) * saturationBoost));
		const sb = Math.min(255, Math.round(avg + (b - avg) * saturationBoost));

		const blendFactor = isDark ? 0.45 : 2.2;
		const dr = Math.min(255, Math.round(sr * blendFactor));
		const dg = Math.min(255, Math.round(sg * blendFactor));
		const db = Math.min(255, Math.round(sb * blendFactor));

		return {
			brightness: isDark ? 'dark' : 'light',
			dominantColor: `rgb(${sr}, ${sg}, ${sb})`,
			dominantColorDark: `rgb(${dr}, ${dg}, ${db})`
		};
	} catch {
		return {
			brightness: 'dark',
			dominantColor: 'rgb(0, 0, 0)',
			dominantColorDark: 'rgb(0, 0, 0)'
		};
	}
}

export function useImageBrightness(
	getImageEl: () => HTMLImageElement | null,
	sampleRegion: SampleRegion = 'bottom'
) {
	return readable<ImageAnalysis | null>(null, (set) => {
		// readable's setup fn only runs in the browser, so no SSR issues
		const img = getImageEl();
		if (!img) return;

		if (img.complete) {
			set(analyse(img, sampleRegion));
		} else {
			const onLoad = () => set(analyse(img, sampleRegion));
			img.addEventListener('load', onLoad);
			return () => img.removeEventListener('load', onLoad);
		}
	});
}
