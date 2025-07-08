<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import CardList from '$lib/components/ui/CardList.svelte';
	import PageCard from '$lib/components/home/PageCard.svelte';
	import { getPagesState, type PageData } from '$lib/state/PagesState.svelte';

	const pagesState = getPagesState();

	function renderPageCard(page: PageData) {
		return `<PageCard page={${page}} />`;
	}

	function getSearchMatch(page: PageData, term: string) {}

	type Sort =
		| 'default'
		| 'created: newest to oldest'
		| 'created: oldest to newest'
		| 'updated: newest to oldest'
		| 'updated: oldest to newest'
		| 'live viewers: highest to lowest'
		| 'live viewers: lowest to highest'
		| 'expires: latest to soonest'
		| 'expires: soonest to latest';

	const sortOptions: Record<Sort, string> = {
		default: 'Default',
		'created: newest to oldest': 'Created: Newest to Oldest',
		'created: oldest to newest': 'Created: Oldest to Newest',
		'updated: newest to oldest': 'Updated: Newest to Oldest',
		'updated: oldest to newest': 'Updated: Oldest to Newest',
		'live viewers: highest to lowest': 'Live Viewers: Highest to Lowest',
		'live viewers: lowest to highest': 'Live Viewers: Lowest to Highest',
		'expires: latest to soonest': 'Expires: Latest to Soonest',
		'expires: soonest to latest': 'Expires: Soonest to Latest'
	};

	function getSortValue(page: PageData, sortKey: string) {}

	onMount(() => {
		pagesState.load();
	});
</script>

<SEO overrides={{ title: `TwitchTrolling for R.E.P.O.` }} />

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
	<!-- {#if pagesState.pages.length}
		<CardList title="Pages" cards={pagesState.pages} renderCard={renderPageCard} searchPlaceholder="Name" {getSearchMatch} {sortOptions} {getSortValue} />
	{/if} -->
</Main>

<style>
	.info {
		margin: 1em 0;
	}
</style>
