<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/Header.svelte';
	import PageCardList from '$lib/components/home/PageCardList.svelte';
	import { setPagesState } from '$lib/PagesState.svelte';

	const pagesState = setPagesState();

	onMount(() => {
		pagesState.load();
	});
</script>

<SEO />

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
		<PageCardList pages={pagesState.pages} />
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

	@media only screen and (max-width: 1000px) {
		main {
			margin: 0 2em;
		}
	}
</style>
