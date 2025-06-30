<script lang="ts">
	import type { PageCardData } from '$lib/types';
	import PageCard from './PageCard.svelte';

	let {
		pages
	}: {
		pages: PageCardData[];
	} = $props();
</script>

<section>
	<div class="header">
		<h2>Pages <span class="count">(x{pages.length})</span></h2>
	</div>
	<div class="list">
		{#each pages as page}
			<PageCard {page} />
		{/each}
	</div>
</section>

<style>
	section {
		margin: 1em 0;
	}

	h2 {
		font-size: 1.5em;
		text-transform: uppercase;
	}

	.header {
		margin-bottom: 0.5em;
	}

	.count {
		font-size: 1.2rem;
		color: #a78bfa;
		text-transform: none;
	}

	.list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
		gap: 1rem;
	}
</style>
