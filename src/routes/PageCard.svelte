<script lang="ts">
	import { base } from '$app/paths';
	import type { PageCardData } from '$lib/types';
	import twitchImage from '$lib/assets/twitch-64x64.png';
	import { timeAgo, formatRemaining, getRemaining } from '$lib/utils';

	let {
		pageCard
	}: {
		pageCard: PageCardData;
	} = $props();

	let createdAgo = $derived.by(() => timeAgo(pageCard.createdAt));
	let updatedAgo = $derived.by(() => timeAgo(pageCard.updatedAt));
	let expiresIn = $derived.by(() => formatRemaining(getRemaining(pageCard.expiresAt)));
</script>

<a href="{base}/page?id={pageCard.id}">
	<section>
		<div class="top">
			<img src={twitchImage} alt="Twitch" />
			<h2>{pageCard.channel}</h2>
		</div>
		<div class="bottom">
			{#if pageCard.pageViewers !== undefined}
				<p>Live Viewers: {pageCard.pageViewers}</p>
			{/if}
			<p>Created {createdAgo} ago</p>
			<p>Updated {updatedAgo} ago</p>
			<p>Expires in {expiresIn}</p>
		</div>
	</section>
</a>

<style>
	section {
		padding: 0.5em;
		border-radius: 8px;
		border: #9146ff solid 2px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		background: #201c24;
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

	.bottom p {
		color: #adadb8;
	}
</style>
