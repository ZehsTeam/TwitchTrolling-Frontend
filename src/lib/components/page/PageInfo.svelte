<script lang="ts">
	import type { PageState } from '$lib/PageState.svelte';
	import twitchImage from '$lib/media/twitch-64x64.png';
	import Partner from '../Partner.svelte';

	let {
		pageState
	}: {
		pageState: PageState;
	} = $props();
</script>

<div class="page-info">
	<div class="channel-container">
		{#if pageState.logo}
			<img src={pageState.logo} alt="Logo" class="full-circle" />
		{:else}
			<img src={twitchImage} alt="Logo" />
		{/if}
		<h1>
			<a href="https://www.twitch.tv/{pageState.channel}" target="_blank">
				{pageState.displayName}
			</a>
		</h1>
		{#if pageState.isPartner}
			<div class="partner-container">
				<Partner margin="0 0 0 4px" />
			</div>
		{/if}
	</div>
	<div class="times-container">
		<p>
			{pageState.liveViewers} Live Viewer{pageState.liveViewers === 1 ? '' : 's'}
			<span class="small-text">(Page)</span>
		</p>
		<p>{pageState.uniqueViews} View{pageState.uniqueViews === 1 ? '' : 's'}</p>
		<p>Created {pageState.createdAgo}</p>
		<p>Updated {pageState.updatedAgo}</p>
		<p>Expires in {pageState.expiresInCountdown}</p>
	</div>
</div>

<style>
	.page-info {
		padding: 1em 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.channel-container {
		display: flex;
		align-items: center;
	}

	.channel-container img {
		width: 2em;
		height: 2em;
		margin-right: 0.5em;
	}

	.times-container {
		display: flex;
		gap: 0.75em;
	}

	.times-container p:not(:last-child)::after {
		content: '/';
		margin-left: 0.75em;
		color: var(--text-muted);
	}

	h1 {
		font-size: 1.8rem;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
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

	@media only screen and (max-width: 1600px) {
		.page-info {
			flex-direction: column;
			justify-content: start;
			align-items: start;
			gap: 8px;
		}
	}

	@media only screen and (max-width: 750px) {
		.times-container {
			flex-direction: column;
		}

		.times-container p:not(:last-child)::after {
			display: none;
		}
	}
</style>
