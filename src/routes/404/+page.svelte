<script lang="ts">
	import SEO from '../SEO.svelte';
	import Header from '../Header.svelte';
</script>

<SEO
	overrides={{ title: 'Error 404 - TwitchTrolling', description: 'This page does not exist.' }}
/>

<Header />

<main>
	<br />
	<h2>Error 404. This page does not exist.</h2>
</main>

<style>
	main {
		margin: 0 20em;
	}

	@media only screen and (max-width: 1420px) {
		main {
			margin: 0 15em;
		}
	}

	@media only screen and (max-width: 1250px) {
		main {
			margin: 0 10em;
		}
	}

	@media only screen and (max-width: 1000px) {
		main {
			margin: 0 2em;
		}
	}
</style>
