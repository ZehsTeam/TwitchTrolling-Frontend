<script lang="ts">
	import twitchImage from '$lib/assets/twitch-64x64.png';

	let {
		channel,
		createdAgo,
		updatedAgo,
		expiresInCountdown,
		pageViewers
	}: {
		channel: string;
		createdAgo: string;
		updatedAgo: string;
		expiresInCountdown: string;
		pageViewers: number;
	} = $props();
</script>

<section>
	<div class="channel-container">
		<img src={twitchImage} alt="Twitch" />
		<h1><a href="https://www.twitch.tv/{channel}" target="_blank">{channel}</a></h1>
	</div>
	<div class="times-container">
		<p>Live Viewers: {pageViewers}</p>
		<p>Created {createdAgo} ago</p>
		<p>Updated {updatedAgo} ago</p>
		<p>Expires in {expiresInCountdown}</p>
	</div>
</section>

<style>
	section {
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

	@media only screen and (max-width: 1550px) {
		section {
			flex-direction: column;
			justify-content: start;
			align-items: start;
			gap: 8px;
		}
	}

	@media only screen and (max-width: 700px) {
		.times-container {
			flex-direction: column;
		}

		.times-container p:not(:last-child)::after {
			display: none;
		}
	}
</style>
