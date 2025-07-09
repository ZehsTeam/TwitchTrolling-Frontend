<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import PageCardList from '$lib/components/repo/PageCardList.svelte';
	import { setPagesState } from '$lib/state/repo/PagesState.svelte';

	const pagesState = setPagesState();

	onMount(() => {
		pagesState.load();
	});
</script>

<SEO
	overrides={{
		title: `TwitchTrolling for R.E.P.O.`,
		description: `R.E.P.O. mod to let Twitch chat spawn monsters and trigger events with custom bit amounts and subs. Highly configurable, easy to use, no extension or app needed.`
	}}
/>

<Header />

<Main>
	<div class="info">
		<p>
			R.E.P.O. mod to let Twitch chat spawn monsters and trigger events with custom bit amounts and
			subs. Highly configurable, easy to use, no extension or app needed.
		</p>
		<p>
			Download the <a href="https://thunderstore.io/c/repo/p/Zehs/TwitchTrolling/" target="_blank"
				>TwitchTrolling</a
			> mod on Thunderstore.
		</p>
	</div>
	{#if pagesState.pages.length}
		<PageCardList pages={pagesState.pages} />
	{/if}
</Main>

<style>
	.info {
		margin: 1em 0;
	}
</style>
