<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './PagesState.svelte';
	import twitchImage from '$lib/assets/twitch-64x64.png';
	import { timeAgo, formatRemaining, getRemaining } from '$lib/utils';

	let {
		page
	}: {
		page: PageData;
	} = $props();

	let createdAgo = $derived.by(() => timeAgo(page.createdAt));
	let updatedAgo = $derived.by(() => timeAgo(page.updatedAt));
	let expiresIn = $derived.by(() => formatRemaining(getRemaining(page.expiresAt)));
</script>

<a href="{base}/page?id={page.id}">
	<section>
		<div class="top">
			<img src={twitchImage} alt="Twitch" />
			<h2>{page.channel}</h2>
		</div>
		<div class="bottom">
			{#if page.pageViewers !== undefined}
				<p>Live Viewers: {page.pageViewers}</p>
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
