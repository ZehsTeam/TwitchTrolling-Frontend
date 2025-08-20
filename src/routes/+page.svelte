<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import PageCardList from '$lib/components/home/PageCardList.svelte';
	import { setPagesState } from '$lib/PagesState.svelte';

	const pagesState = setPagesState();

	onMount(() => {
		pagesState.load();
	});
</script>

<SEO />

<div class="info-section">
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

{#if pagesState.state === 'loading'}
	<h2>Loading...</h2>
{:else if pagesState.state == 'loaded' && pagesState.pages.length}
	<div class="info-section">
		<p>Check out some streamers using the mod right now!</p>
	</div>

	<PageCardList pages={pagesState.pages} />
{:else if pagesState.state === 'failed'}
	<h2>Failed to fetch pages data.</h2>
{:else}
	<h2>No pages found.</h2>
{/if}

<style>
	.info-section {
		margin: 1em 0;
	}
</style>
