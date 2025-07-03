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
		margin: 0 var(--page-width-margin-1);
	}

	@media only screen and (max-width: var(--page-width-2)) {
		main {
			margin: 0 var(--page-width-margin-2);
		}
	}

	@media only screen and (max-width: var(--page-width-3)) {
		main {
			margin: 0 var(--page-width-margin-3);
		}
	}

	@media only screen and (max-width: var(--page-width-4)) {
		main {
			margin: 0 var(--page-width-margin-4);
		}
	}
</style>
