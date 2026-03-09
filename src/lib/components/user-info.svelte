<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<div class="flex flex-row items-center gap-2">
	<Avatar.Root>
		<Avatar.Image src="https://maruchansquigle.vercel.app/maru.jpg" alt="Maru" />
		<Avatar.Fallback>Maru</Avatar.Fallback>
	</Avatar.Root>
	<div class="grid flex-1 text-left text-sm leading-tight">
		<span class="truncate font-medium">Maru</span>
	</div>
</div>
