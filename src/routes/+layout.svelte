<script lang="ts">
	import './layout.css';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';

	const { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="max-w-9xl mx-auto flex flex-col p-10 select-none">
		{@render children()}
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
