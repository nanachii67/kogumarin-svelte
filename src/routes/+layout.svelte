<script lang="ts">
	import './layout.css';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';

	const { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />

	<main class="mx-auto max-w-7xl">
		<div class="not-sr-only p-2 md:sr-only">
			<Sidebar.Trigger />
		</div>

		<section class="flex flex-col p-10 select-none">
			{@render children()}
		</section>
	</main>
</Sidebar.Provider>

<style lang="scss">
	/* .default-page-container {
		display: flex;
		flex-direction: column;
		max-width: 72rem;
		margin-inline: auto;
		padding-inline: 1rem;
	} */
</style>
