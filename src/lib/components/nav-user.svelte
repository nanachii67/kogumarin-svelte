<script>
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import UserInfo from './user-info.svelte';
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			size="lg"
			class="group text-sidebar-accent-foreground data-state-open:bg-sidebar-accent"
			data-test="sidebar-menu-button"
		>
			<UserInfo />
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
</Sidebar.Menu>
