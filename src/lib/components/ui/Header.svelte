<script lang="ts">
	import { base } from '$app/paths';

	let {
		homeLink = '/'
	}: {
		homeLink?: string;
	} = $props();
</script>

<section>
	<h1><a href="{base}{homeLink}">TwitchTrolling</a></h1>
	<p>
		by <a href="https://solo.to/crithaxxog" target="_blank">CritHaxXoG</a> for
		<a href="https://www.twitch.tv/psychohypnotic" target="_blank">PsychoHypnotic</a>
	</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		align-items: end;
		background-color: var(--purple);
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
		section {
			padding: 1rem 15em;
		}
	}

	@media only screen and (max-width: 1250px) {
		section {
			padding: 1rem 10em;
		}
	}

	@media only screen and (max-width: 960px) {
		section {
			padding: 1rem 2em;
		}
	}

	@media only screen and (max-width: 450px) {
		section {
			flex-direction: column;
			align-items: start;
		}
	}
</style>
