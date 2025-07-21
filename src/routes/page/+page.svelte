<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { enemyImageMap, eventImageMap } from '$lib/imageMaps';
	import { getPageState } from './PageState.svelte';
	import SEO from '../SEO.svelte';
	import Header from '../Header.svelte';
	import PageInfo from './PageInfo.svelte';
	import CardList from './CardList.svelte';
	import bitsImage from '$lib/assets/bits.png';
	import Star from '../Star.svelte';

	const pageState = getPageState();

	$effect(() => {
		if (pageState.state === 'loaded') {
			document.title = `${pageState.channel} - TwitchTrolling for R.E.P.O.`;
		}
	});

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const pageId = urlParams.get('id');

		pageState.load(pageId || '');
	});

	onDestroy(() => {
		pageState.unload();
	});
</script>

<SEO
	overrides={{
		title: `Streamer's Page - TwitchTrolling for R.E.P.O.`,
		description: `See the streamer's prices and info for enabled enemies and events.`
	}}
/>

<Header />

<main>
	{#if pageState.state === 'loading'}
		<br />
		<h2>Loading...</h2>
	{:else if pageState.state === 'expired'}
		<br />
		<h2>This page has expired.</h2>
	{:else if pageState.state === 'deleted'}
		<br />
		<h2>This page has been deleted.</h2>
	{:else if pageState.state == 'loaded'}
		<PageInfo
			channel={pageState.channel}
			createdAgo={pageState.createdAgo}
			updatedAgo={pageState.updatedAgo}
			expiresInCountdown={pageState.expiresInCountdown}
			liveViewers={pageState.liveViewers}
			uniqueViews={pageState.uniqueViews}
		/>

		{#if pageState.enemies.length || pageState.events.length}
			<div class="info-section">
				<p>
					To spawn enemies or trigger events, simply cheer the specified amount of bits in the
					streamer's chat.
				</p>
				<p>
					If multiple enemies share the same prices, or multiple events, one will be chosen at
					random from that group.
				</p>
			</div>
			<div class="info-section">
				<h2>Important Information</h2>
				<p>Only the host of the lobby can spawn enemies and trigger events!</p>
				<p>You can edit the prices in the in-game MODS menu.</p>
				<p>
					Enemy prices can't match event prices. While duplicate prices are allowed within enemies
					or within events, no enemy can have the same price as any event.
				</p>
				<p>RANDOM ENEMY and RANDOM EVENT cannot share the same price.</p>
				<p>Please notify the streamer if you notice any prices like this.</p>
				<div class="currencies-container">
					<div class="currency-container">
						<img src={bitsImage} alt="Twitch Bits" />
						<p>Twitch bits</p>
					</div>
					<div class="currency-container">
						<Star />
						<p>Twitch subs</p>
					</div>
				</div>
			</div>
		{/if}

		{#if pageState.enemies.length && pageState.subEnemySpawnCountMultipliers}
			<div class="info-section">
				<h2>Sub Tier Multipliers</h2>
				<p>
					Using subs to spawn enemies will multiply the enemy spawn count by the tier of the sub.
				</p>
				<p>
					Tier 1: Multiplies enemy spawn count by {pageState.subEnemySpawnCountMultipliers.tier1}
				</p>
				<p>
					Tier 2: Multiplies enemy spawn count by {pageState.subEnemySpawnCountMultipliers.tier2}
				</p>
				<p>
					Tier 3: Multiplies enemy spawn count by {pageState.subEnemySpawnCountMultipliers.tier3}
				</p>
			</div>
		{/if}

		{#if pageState.enemies.length}
			<CardList title="Enemies" cards={pageState.enemies} cardImageMap={enemyImageMap} />
		{/if}

		{#if pageState.events.length}
			<CardList title="Events" cards={pageState.events} cardImageMap={eventImageMap} />
		{/if}

		{#if !pageState.enemies.length && !pageState.events.length}
			<p>No enemies or events enabled.</p>
		{/if}
	{:else}
		<br />
		<h2>This page does not exist.</h2>
	{/if}
</main>

<style>
	main {
		margin: 0 20em;
	}

	.info-section {
		margin-bottom: 1em;
	}

	.currencies-container {
		display: flex;
		gap: 0.75em;
	}

	.currency-container {
		display: flex;
		align-items: center;
	}

	.currency-container img {
		width: 15px;
		height: 15px;
		margin-right: 4px;
	}

	.currency-container:not(:last-child)::after {
		content: '/';
		margin-left: 0.75em;
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
