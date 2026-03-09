<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>

<header
	class="flex h-16 shrink-0 items-center gap-2 border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
>
	<div class="flex items-center gap-2">
		<Sidebar.Trigger class="-ml-1" />
	</div>
</header>
