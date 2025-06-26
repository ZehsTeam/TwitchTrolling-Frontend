<script lang="ts">
	import twitchImage from '$lib/assets/twitch-64x64.png';

	let {
		channel,
		countdown
	}: {
		channel: string;
		countdown: string;
	} = $props();
</script>

<section>
	<div class="channel-container">
		<img src={twitchImage} alt="twitch" />
		<h2><a href="https://www.twitch.tv/{channel}" target="_blank">{channel}</a></h2>
	</div>
	<p>Expires in: {countdown}</p>
</section>

<style>
	section {
		padding: 1rem 0;
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

	.channel-container h2 {
		font-size: 1.8rem;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	@media only screen and (max-width: 570px) {
		section {
			flex-direction: column;
			justify-content: start;
			align-items: start;
			gap: 8px;
		}
	}
</style>
