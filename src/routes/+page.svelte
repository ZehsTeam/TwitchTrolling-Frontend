<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import GameCardList from '$lib/components/home/GameCardList.svelte';
</script>

<SEO />

<Header />

<Main>
	<div class="info">
		<p>
			Mods to let Twitch chat interact with your game. Highly configurable, easy to use, no
			extension or app needed.
		</p>
	</div>
	<GameCardList />
</Main>

<style>
	.info {
		margin: 1em 0;
	}
</style>
