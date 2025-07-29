<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/Header.svelte';
	import PageCardList from '$lib/components/home/PageCardList.svelte';
	import { setPagesState } from '$lib/PagesState.svelte';
	import Main from '$lib/components/Main.svelte';

	const pagesState = setPagesState();

	onMount(() => {
		pagesState.load();
	});
</script>

<SEO />

<Header />

<Main>
	<div class="header">
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
        <PageCardList pages={pagesState.pages} />
    {:else if pagesState.state === 'failed'}
        <h2>Failed to fetch pages data.</h2>
	{:else}
		<h2>No pages found.</h2>
	{/if}
</Main>

<style>
	.header {
		margin: 1em 0;
	}
</style>
