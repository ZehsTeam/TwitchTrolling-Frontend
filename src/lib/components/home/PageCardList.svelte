<script lang="ts">
	import type { PageData } from '$lib/PagesState.svelte';
	import PageCard from '$lib/components/home/PageCard.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	let {
		pages
	}: {
		pages: PageData[];
	} = $props();

	let search = $state('');

	type PageSort =
		| 'default'
		| 'created: newest to oldest'
		| 'created: oldest to newest'
		| 'updated: newest to oldest'
		| 'updated: oldest to newest'
		| 'live viewers: highest to lowest'
		| 'live viewers: lowest to highest'
		| 'expires: latest to soonest'
		| 'expires: soonest to latest';

	const pageSortOptions: Record<PageSort, string> = {
		default: 'Default',
		'created: newest to oldest': 'Created: Newest to Oldest',
		'created: oldest to newest': 'Created: Oldest to Newest',
		'updated: newest to oldest': 'Updated: Newest to Oldest',
		'updated: oldest to newest': 'Updated: Oldest to Newest',
		'live viewers: highest to lowest': 'Live Viewers: Highest to Lowest',
		'live viewers: lowest to highest': 'Live Viewers: Lowest to Highest',
		'expires: latest to soonest': 'Expires: Latest to Soonest',
		'expires: soonest to latest': 'Expires: Soonest to Latest'
	};

	let pageSort = $state<PageSort>('created: newest to oldest');

	let filteredPages = $derived.by(() => {
		let result = pages;

		// Apply search filter
		if (search.trim()) {
			const searchTerm = search.toLowerCase().trim();
			result = result.filter((card) => card.channel.toLowerCase().includes(searchTerm));
		}

		// Apply sorting
		switch (pageSort) {
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
				result = [...result].sort((a, b) => {
					// Handle null values - treat them as earliest possible date
					const aTime = a.updatedByOwnerAt ? new Date(a.updatedByOwnerAt).getTime() : 0;
					const bTime = b.updatedByOwnerAt ? new Date(b.updatedByOwnerAt).getTime() : 0;
					return bTime - aTime;
				});
				break;
			case 'updated: oldest to newest':
				result = [...result].sort((a, b) => {
					// Handle null values - treat them as earliest possible date
					const aTime = a.updatedByOwnerAt ? new Date(a.updatedByOwnerAt).getTime() : 0;
					const bTime = b.updatedByOwnerAt ? new Date(b.updatedByOwnerAt).getTime() : 0;
					return aTime - bTime;
				});
				break;
			case 'live viewers: highest to lowest':
				result = [...result].sort((a, b) => (b.liveViewers || 0) - (a.liveViewers || 0));
				break;
			case 'live viewers: lowest to highest':
				result = [...result].sort((a, b) => (a.liveViewers || 0) - (b.liveViewers || 0));
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

<div class="page-card-list">
	<div class="header">
		<h2>Pages <span class="count">(x{filteredPages.length})</span></h2>
		<div class="filters">
			<div class="input-container">
				<p>Search:</p>
				<input bind:value={search} type="text" placeholder="Name" />
			</div>
			<div class="input-container">
				<p>Sort by:</p>
				<Select
					options={pageSortOptions}
					value={pageSort}
					handleChanged={(value) => (pageSort = value as PageSort)}
					class="sort-select"
				/>
			</div>
		</div>
	</div>
	<div class="cards">
		{#each filteredPages as page}
			<PageCard {page} />
		{/each}
	</div>
</div>

<style>
	.page-card-list {
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
		color: var(--text-muted);
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

	@media only screen and (max-width: 730px) {
		.header {
			flex-direction: column;
			align-items: start;
			gap: 1em;
		}
	}

	@media only screen and (max-width: 640px) {
		.filters {
			flex-direction: column;
			gap: 1em;
		}
	}

	@media only screen and (max-width: 420px) {
		.filters,
		.input-container {
			width: 100%;
		}

		input,
		:global(.sort-select) {
			flex-grow: 1;
		}
	}
</style>
