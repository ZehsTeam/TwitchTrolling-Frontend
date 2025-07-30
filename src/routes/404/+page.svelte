<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/Header.svelte';
	import Main from '$lib/components/Main.svelte';
	import BrowsePagesButton from '$lib/components/BrowsePagesButton.svelte';
</script>

<SEO
	overrides={{ title: 'Error 404 - TwitchTrolling', description: 'This page does not exist.' }}
/>

<Header />

<Main>
	<br />
	<h2>Error 404. This page does not exist.</h2>
	<br />
	<BrowsePagesButton />
</Main>

<style>
</style>
