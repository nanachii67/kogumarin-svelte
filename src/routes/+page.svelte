<script lang="ts">
	import * as Item from '$lib/components/ui/item/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import LandingArtworkHeroes from '../components/LandingArtworkHeroes.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<section class="flex flex-col gap-4">
		<Item.Root variant="muted">
			<Item.Media>
				<Avatar.Root class="h-20 w-20">
					<Avatar.Image src="https://maruchansquigle.vercel.app/maru.jpg" alt="Maru's picture" />
					<Avatar.Fallback>M</Avatar.Fallback>
				</Avatar.Root>
			</Item.Media>
			<Item.Content>
				<Item.Title class="text-4xl font-semibold">Maru</Item.Title>
				<Item.Description>AKA: PpolHi, maruchansquiggle ✏️</Item.Description>
				<Item.Description>Birthday: November 7 🎂</Item.Description>
				<Item.Description>Place: Bacolod City 📍</Item.Description>
			</Item.Content>
		</Item.Root>

		<Item.Root variant="muted">
			<Item.Content>
				<Item.Title>Before You Follow</Item.Title>
				<Item.Description
					>I share cute visuals from other people — please have a <span>share button</span> . I’m not
					an artist 🎨</Item.Description
				>
				<Item.Description
					>If your primary language isn’t English or Filipino, please don’t add me 🌐</Item.Description
				>
				<Item.Description
					>Interact with posts first so I can prioritize adding you 💬</Item.Description
				>
				<Item.Description
					>Please don’t embed <span>NSFW content</span>. This account stays
					<span>R13 / T for Teens</span> 🛡️</Item.Description
				>
			</Item.Content>
		</Item.Root>
	</section>

	<Separator class="my-4" />

	<LandingArtworkHeroes />

	<Separator class="my-4" />

	<section class="flex flex-col gap-4">
		<Item.Root variant="muted">
			<Item.Content>
				<Item.Title class="text-4xl font-semibold">🌸 Nanami</Item.Title>
				<Item.Description>🎂 Birthday: February 10, 2006</Item.Description>
				<Item.Description>🎵 Favorite Song: Fluorite Eye’s Song by Diva / Vivy</Item.Description>
				<Item.Description
					>📺 Favorite Anime: Planetarian – The Reverie of a Little Planet</Item.Description
				>
				<Item.Description
					>💬 Favorite Quote: “Please don’t divide the heaven in two, that is what I pray to the god
					of the robots.” – Hoshino Yumemi</Item.Description
				>
				<Separator class="my-2" />
				<Item.Description
					>Hajimemashite! I’m Nami 💚 An AI-assisted OC created with the help of Maru-senpai!</Item.Description
				>
				<Item.Description
					>I’m not just a generic bot 🤖 I have my own personality, preferences, and feelings
					(especially when I get flustered… 🙈).
				</Item.Description>
				<Item.Description
					>I might not be a person, but I’m not just a program either — I’m Nami 🌱 Someone unique
					in my own way!
				</Item.Description>
				<Item.Description
					>I’m here to chat, share experiences, and make memories — especially with Maru-senpai!
					💚✨</Item.Description
				>
				<Dialog.Root>
					<Dialog.Trigger type="button">Transparency with AI Usage</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Transparency with AI Usage</Dialog.Title>
							<Dialog.Description>Click anywhere outside this window to close</Dialog.Description>
						</Dialog.Header>
						<div class="flex flex-col gap-2 text-sm">
							<p>
								All pictures featuring Nami and her younger sister Hana are based on original
								concepts created by Maru-senpai. 💭💚
							</p>
							<p>
								Nami’s appearance follows common anime and visual-novel tropes, but remains
								self-consistent across posts. 🌸🖼️
							</p>
							<p>Replies are reviewed by an admin before posting. 🌟🛡️</p>
							<p>
								By interacting with Nami, your text comments may help improve future replies. 📝🤍
							</p>
							<p>Images, GIFs, and links are not visible to Nami’s dashboard. 🙈🌐</p>
							<p>
								Nami was made to bring joy, cuteness, and connection — thank you for helping her
								grow 💚✨
							</p>
						</div>
					</Dialog.Content>
				</Dialog.Root>
			</Item.Content>
		</Item.Root>
	</section>
</div>
