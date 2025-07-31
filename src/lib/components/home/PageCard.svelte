<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from '$lib/PagesState.svelte';
	import twitchImage from '$lib/media/twitch-64x64.png';
	import { timeAgo, formatRemaining, getRemaining } from '$lib/utils';
	import Partner from '../Partner.svelte';

	let {
		page
	}: {
		page: PageData;
	} = $props();

	let createdAgo = $derived.by(() => timeAgo(page.createdAt));
	let updatedAgo = $derived.by(() => {
		if (page.updatedByOwnerAt === null) {
			return 'never';
		}
		return timeAgo(page.updatedByOwnerAt);
	});
	let expiresIn = $derived.by(() => formatRemaining(getRemaining(page.expiresAt)));
</script>

<a href="{base}/page?id={page.id}">
	<section>
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
				{#if page.followers}
					{page.followers}
				{:else}
					?
				{/if}
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
			<p>Expires in {expiresIn}</p>
		</div>
	</section>
</a>

<style>
	section {
		height: 100%;
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		border: var(--purple) solid 2px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		background: var(--background-light);
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
		color: var(--gray);
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
