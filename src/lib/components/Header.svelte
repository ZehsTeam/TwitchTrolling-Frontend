<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="header">
	<h1><a href="{base}/">TwitchTrolling</a></h1>
	<p>
		by <a href="https://solo.to/crithaxxog" target="_blank">CritHaxXoG</a> for
		<a href="https://www.twitch.tv/psychohypnotic" target="_blank">PsychoHypnotic</a>
	</p>
</div>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: end;
		background-color: var(--accent);
		padding: 1rem 20em;
		user-select: none;
	}

	h1 {
		margin-right: 8px;
		font-size: 1.75rem;
		font-weight: 500;
	}

	h1 a {
		text-decoration: none;
	}

	@media only screen and (max-width: 1420px) {
		.header {
			padding: 1rem 15em;
		}
	}

	@media only screen and (max-width: 1250px) {
		.header {
			padding: 1rem 10em;
		}
	}

	@media only screen and (max-width: 960px) {
		.header {
			padding: 1rem 2em;
		}
	}

	@media only screen and (max-width: 450px) {
		.header {
			flex-direction: column;
			align-items: start;
		}
	}
</style>
