<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<Header />

<main>
	{@render children()}
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
