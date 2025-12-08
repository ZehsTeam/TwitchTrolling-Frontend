<script lang="ts">
	import { base } from '$app/paths';
	import type { PageDataCompact } from '$lib/types';
	import twitchImage from '$lib/media/twitch-64x64.png';
	import { timeAgo, formatDuration, getRemaining, formatNumber } from '$lib/utils';
	import Partner from '$lib/components/Partner.svelte';

	let {
		page
	}: {
		page: PageDataCompact;
	} = $props();

	let createdAgo = $derived(page.createdAt ? timeAgo(page.createdAt) : 'never');
	let updatedAgo = $derived(page.updatedByOwnerAt ? timeAgo(page.updatedByOwnerAt) : 'never');
	let expiresIn = $derived(
		page.expiresAt ? `in ${formatDuration(getRemaining(page.expiresAt))}` : 'never'
	);
	let followersFormatted = $derived(formatNumber(page.followers || 0));
</script>

<a href="{base}/page?id={page.id}">
	<div class="page-card">
		<div class="top">
			{#if page.logo}
				<img src={page.logo} alt="Logo" class="full-circle" />
			{:else}
				<img src={twitchImage} alt="Logo" />
			{/if}
			<h2>{page.displayName}</h2>
			{#if page.isPartner}
				<div class="partner-container">
					<Partner margin="0 0 0 4px" />
				</div>
			{/if}
		</div>
		<div class="push-down"></div>
		<div class="bottom">
			<p>
				{followersFormatted}
				Followers
			</p>
			{#if page.liveViewers !== undefined}
				<p>
					{page.liveViewers} Live Viewer{page.liveViewers === 1 ? '' : 's'}
					<span class="small-text">(Page)</span>
				</p>
			{/if}
			{#if page.uniqueViews !== undefined}
				<p>{page.uniqueViews} View{page.uniqueViews === 1 ? '' : 's'}</p>
			{/if}
			<p>Created {createdAgo}</p>
			<p>Updated {updatedAgo}</p>
			<p>Expires {expiresIn}</p>
		</div>
	</div>
</a>

<style>
	.page-card {
		height: 100%;
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		background: var(--bg-light);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-card);
	}

	img {
		width: 1.5em;
		height: 1.5em;
		margin-right: 0.5em;
	}

	a {
		text-decoration: none;
	}

	.top {
		display: flex;
		align-items: center;
	}

	.push-down {
		flex-grow: 1;
	}

	.bottom p {
		color: var(--text-muted);
	}

	.full-circle {
		border-radius: 50%;
	}

	.small-text {
		font-size: 0.8em;
	}

	.partner-container {
		display: flex;
		align-items: end;
	}
</style>
