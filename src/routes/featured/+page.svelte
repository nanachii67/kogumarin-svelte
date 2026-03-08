<script lang="ts">
	import * as Item from '$lib/components/ui/item/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ChevronRight } from '@lucide/svelte';
	import facebookFriends from '$lib/constants/facebook-friends.json' with { type: 'json' };
	import youtubeChannels from '$lib/constants/youtubers.json' with { type: 'json' };

	const facebookFriendsMap = facebookFriends;
	const youtubeChannelsMap = youtubeChannels;
</script>

<svelte:head>
	<title>Featured</title>
</svelte:head>

<div>
	<section class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<Card.Root class="col-span-2">
			<Card.Header>
				<Card.Title>Facebook Friends</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each facebookFriendsMap.items as friend (friend.id)}
						<Item.Root>
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={friend.featured_friend_link}
								target="_blank"
								rel="noopener noreferrer"
								class="flex flex-row items-center justify-between"
							>
								<p class="font-semibold md:text-xl">{friend.featured_name}</p>
								<Item.Actions><ChevronRight /></Item.Actions>
							</a>
						</Item.Root>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root class="col-span-2">
			<Card.Header>
				<Card.Title>YouTubers</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each youtubeChannelsMap.items as youtubers (youtubers.id)}
						<Item.Root class="items-start">
							<div class="flex flex-col">
								<div class="flex flex-col md:flex-row md:items-center md:gap-1">
									<p class="text-xl font-semibold">{youtubers.featured_name}</p>
									<div class="flex flex-row gap-1">
										{#each youtubers.featured_links as link (link.featured_link_id)}
											<a
												href={link.featured_handler_link}
												target="_blank"
												rel="noopener noreferrer"
												class="text-xl text-muted-foreground underline-offset-2 hover:underline"
											>
												{link.featured_link_social}
											</a>
										{/each}
									</div>
								</div>
								<p class="text-muted-foreground">{youtubers.featured_description}</p>
							</div>
						</Item.Root>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</section>
</div>
