<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { enemyImageMap, eventImageMap } from '$lib/imageMaps';
	import { setPageState } from '$lib/PageState.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/Header.svelte';
	import PageInfo from '$lib/components/page/PageInfo.svelte';
	import CardList from '$lib/components/page/CardList.svelte';
	import Bit from '$lib/components/Bit.svelte';
	import Star from '$lib/components/Star.svelte';
	import Gift from '$lib/components/Gift.svelte';
	import Main from '$lib/components/Main.svelte';

	const pageState = setPageState();

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

<Main>
	{#if pageState.state === 'loading'}
		<br />
		<h2>Loading...</h2>
	{:else if pageState.state === 'expired'}
		<br />
		<h2>This page has expired.</h2>
	{:else if pageState.state === 'deleted'}
		<br />
		<h2>This page has been deleted.</h2>
	{:else if pageState.state === 'failed'}
		<br />
		<h2>Failed to fetch page data.</h2>
	{:else if pageState.state == 'loaded'}
		<PageInfo {pageState} />

		{#if pageState.enemies.length || pageState.events.length}
			<div class="info-section">
				<p>
					To spawn enemies or trigger events, simply cheer the specified amount of bits, subscribe,
					or gift subscriptions in the streamer's chat.
				</p>
				<p>
					If multiple enemies share the same prices or multiple events share the same prices, one
					will be chosen at random from that group.
				</p>
			</div>
			<div class="info-section">
				<div class="currencies-container">
					<p>Key:</p>
					<div class="currency-container">
						<dt><Bit yOffset="0" /></dt>
						<dd>Twitch Bit</dd>
					</div>
					<div class="currency-container">
						<dt><Star yOffset="0" /></dt>
						<dd>Twitch Sub</dd>
					</div>
					<div class="currency-container">
						<dt><Gift yOffset="0" /></dt>
						<dd>Twitch Gift Sub</dd>
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
					Tier 1 <Star yOffset="2px" /> or <Gift yOffset="2px" /> multiplies enemy spawn count by {pageState
						.subEnemySpawnCountMultipliers.tier1}
				</p>
				<p>
					Tier 2 <Star yOffset="2px" /> or <Gift yOffset="2px" /> multiplies enemy spawn count by {pageState
						.subEnemySpawnCountMultipliers.tier2}
				</p>
				<p>
					Tier 3 <Star yOffset="2px" /> or <Gift yOffset="2px" /> multiplies enemy spawn count by {pageState
						.subEnemySpawnCountMultipliers.tier3}
				</p>
			</div>
		{/if}

		{#if pageState.enemies.length || pageState.events.length}
			<div class="info-section">
				<h2>Important Information</h2>
				<p>Only the host of the lobby can spawn enemies and trigger events!</p>
				<p>You can edit the prices in the in-game MODS menu.</p>
				<p>
					Enemy prices can't match event prices. While duplicate prices are allowed within enemies
					or within events, no enemy can have the same price as any event.
				</p>
				<p>RANDOM ENEMY and RANDOM EVENT must have unique prices.</p>
				<p>Please notify the streamer if you notice any prices like this.</p>
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
</Main>

<style>
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
</style>
