<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Main from '$lib/components/ui/Main.svelte';
</script>

<SEO
	overrides={{
		title: `TwitchTrolling for Lethal Company`,
		description: `Lethal Company mod to let Twitch chat spawn monsters with subs, bits, raids, and spawn points.
			Highly configurable, easy to use, no extension or app needed.`
	}}
/>

<Header />

<Main>
	<div class="info">
		<p>
			Lethal Company mod to let Twitch chat spawn monsters with subs, bits, raids, and spawn points.
			Highly configurable, easy to use, no extension or app needed.
		</p>
		<p>
			Download the <a
				href="https://thunderstore.io/c/lethal-company/p/Zehs/MonsterHotkeys/"
				target="_blank">MonsterHotkeys</a
			> mod on Thunderstore.
		</p>
	</div>
</Main>

<style>
	.info {
		margin: 1em 0;
	}
</style>
