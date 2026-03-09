<script lang="ts">
	import './layout.css';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import AppSidebarHeader from '$lib/components/app-sidebar-header.svelte';

	interface Props {
		children: import('svelte').Snippet;
		variant?: 'header' | 'sidebar';
	}

	// eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
	let { children, variant = 'sidebar' }: Props = $props();

	let open: boolean = $state(
		typeof window !== 'undefined' ? localStorage.getItem('sidebar:state') === 'true' : false
	);

	$effect(() => {
		localStorage.setItem('sidebar:state', open.toString());
	});
</script>

{#if variant === 'header'}
	<div class="flex min-h-screen w-full flex-col">
		{@render children()}
	</div>
{:else}
	<Sidebar.Provider {open} onOpenChange={(v) => (open = v)}>
		<AppSidebar />

		<main class="">
			<AppSidebarHeader />
			<main class="mx-auto flex max-w-7xl flex-col px-5 select-none md:px-10 md:py-10">
				{@render children()}
			</main>
		</main>
	</Sidebar.Provider>
{/if}
