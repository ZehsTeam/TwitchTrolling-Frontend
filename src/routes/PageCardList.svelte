<script lang="ts">
	import type { PageCardData, PageCardSort } from '$lib/types';
	import PageCard from './PageCard.svelte';
	import Select from './Select.svelte';

	let {
		pageCards
	}: {
		pageCards: PageCardData[];
	} = $props();

	let search = $state('');

	const pageCardSortOptions: Record<PageCardSort, string> = {
		default: 'Default',
		'created: newest to oldest': 'Created: Newest to Oldest',
		'created: oldest to newest': 'Created: Oldest to Newest',
		'updated: newest to oldest': 'Updated: Newest to Oldest',
		'updated: oldest to newest': 'Updated: Oldest to Newest',
		'expires: latest to soonest': 'Expires: Latest to Soonest',
		'expires: soonest to latest': 'Expires: Soonest to Latest'
	};

	let pageCardSort = $state<PageCardSort>('created: newest to oldest');

	let filteredPageCards = $derived.by(() => {
		let result = pageCards;

		// Apply search filter
		if (search.trim()) {
			const searchTerm = search.toLowerCase().trim();
			result = result.filter((card) => card.channel.toLowerCase().includes(searchTerm));
		}

		// Apply sorting
		switch (pageCardSort) {
			case 'created: newest to oldest':
				result = [...result].sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			case 'created: oldest to newest':
				result = [...result].sort(
					(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
				break;
			case 'updated: newest to oldest':
				result = [...result].sort(
					(a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
				);
				break;
			case 'updated: oldest to newest':
				result = [...result].sort(
					(a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
				);
				break;
			case 'expires: latest to soonest':
				result = [...result].sort(
					(a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime()
				);
				break;
			case 'expires: soonest to latest':
				result = [...result].sort(
					(a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
				);
				break;
		}

		return result;
	});
</script>

<section>
	<div class="header">
		<h2>Pages <span class="count">(x{filteredPageCards.length})</span></h2>
		<div class="filters">
			<div class="input-container">
				<p>Search:</p>
				<input bind:value={search} type="text" placeholder="Name" />
			</div>
			<div class="input-container">
				<p>Sort by:</p>
				<Select
					options={pageCardSortOptions}
					value={pageCardSort}
					handleChanged={(value) => (pageCardSort = value as PageCardSort)}
				/>
			</div>
		</div>
	</div>
	<div class="cards">
		{#each filteredPageCards as pageCard}
			<PageCard {pageCard} />
		{/each}
	</div>
</section>

<style>
	section {
		margin-bottom: 2em;
	}

	.header {
		margin-bottom: 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
	}

	.count {
		font-size: 1.2rem;
		color: #a78bfa;
		text-transform: none;
	}

	.filters {
		display: flex;
		gap: 2em;
	}

	.input-container {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	h2 {
		font-size: 1.5em;
		text-transform: uppercase;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
		gap: 1rem;
	}

	@media only screen and (max-width: 650px) {
		.header {
			flex-direction: column;
			align-items: start;
			gap: 1em;
		}
	}

	@media only screen and (max-width: 570px) {
		.filters {
			flex-direction: column;
			gap: 1em;
		}
	}
</style>
