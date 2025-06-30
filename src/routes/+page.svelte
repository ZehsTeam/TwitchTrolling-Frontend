<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from './SEO.svelte';
	import type { PageCardData } from '$lib/types';
	import Header from './Header.svelte';
	import PageCardList from './PageCardList.svelte';

	const apiOrigin = 'https://twitchtrolling.up.railway.app';

	let pages = $state<PageCardData[]>([]);

	async function fetchPagesData() {
		try {
			const res = await fetch(`${apiOrigin}/api/pages`);

			if (!res.ok) {
				throw new Error('Failed to fetch pages data');
			}

			const data: PageCardData[] = await res.json();
			pages = data;
		} catch (err) {
			console.error('Fetch error:', err);
			pages = [];
		}
	}

	onMount(() => {
		document.title = `TwitchTrolling`;

		fetchPagesData();
	});
</script>

<SEO />

<Header />

<main>
	<div class="header">
		<p>
			Let Twitch chat spawn monsters and trigger events with custom bit amounts and subs. Highly
			configurable, easy to use, no extension or app needed.
		</p>
		<p>
			Download the <a href="https://thunderstore.io/c/repo/p/Zehs/TwitchTrolling/" target="_blank"
				>TwitchTrolling</a
			> mod on Thunderstore.
		</p>
	</div>
	{#if pages.length}
		<PageCardList {pages} />
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
