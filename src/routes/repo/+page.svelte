<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '../SEO.svelte';
	import Header from '../Header.svelte';
	import CardList from '../CardList.svelte';
	import PageCard from '../PageCard.svelte';
	import { getPagesState, type PageData } from '../PagesState.svelte';

    const pagesState = getPagesState();

    function renderPageCard(page: PageData) {
        return `<PageCard page={${page}} />`;
    }

    function getSearchMatch(page: PageData, term: string) {

    }

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

    function getSortValue(page: PageData, sortKey: string) {

    }

	onMount(() => {
		pagesState.load();
	});
</script>

<SEO
	overrides={{ title: `TwitchTrolling for R.E.P.O.` }}
/>

<Header />

<main>
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
	{#if pagesState.pages.length}
		<CardList title="Pages" cards={pagesState.pages} renderCard={renderPageCard} searchPlaceholder="Name" {getSearchMatch} {sortOptions} {getSortValue} />
	{/if}
</main>

<style>
	main {
		margin: 0 20em;
	}

	.header {
		margin: 1em 0;
	}

	@media only screen and (max-width: 1420px) {
		main {
			margin: 0 15em;
		}
	}

	@media only screen and (max-width: 1250px) {
		main {
			margin: 0 10em;
		}
	}

	@media only screen and (max-width: 960px) {
		main {
			margin: 0 2em;
		}
	}
</style>
