<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import HouseIcon from '@lucide/svelte/icons/house';
	import StarIcon from '@lucide/svelte/icons/star';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import LinkIcon from '@lucide/svelte/icons/link';

	const items = [
		{ title: 'Home', url: '/', icon: HouseIcon },
		{ title: 'Featured', url: '/featured', icon: StarIcon },
		{ title: 'Folders', url: '/folders', icon: FolderIcon }
	];

	const integration = [
		{ title: 'Notes', url: '/notes', icon: LinkIcon },
		{ title: 'AniList', url: '/anilist', icon: LinkIcon },
		{ title: 'Apple Music', url: '/applemusic', icon: LinkIcon }
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>
				<div>
					<p>Maru</p>
					<p>Jm Demisana</p>
				</div>
			</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupLabel>Integrations</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each integration as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
