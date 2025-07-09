<script lang="ts">
	import type { PageData } from '$lib/state/repo/PagesState.svelte';
	import CardHolder from '$lib/components/ui/CardHolder.svelte';
	import PageCard from '$lib/components/repo/PageCard.svelte';

	let {
		pages
	}: {
		pages: PageData[];
	} = $props();

	let search = $state('');

	type Sort =
		| 'default'
		| 'created: newest to oldest'
		| 'created: oldest to newest'
		| 'updated: newest to oldest'
		| 'updated: oldest to newest'
		| 'live viewers: highest to lowest'
		| 'live viewers: lowest to highest'
		| 'expires: latest to soonest'
		| 'expires: soonest to latest';

	const sortOptions: Record<Sort, string> = {
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

	let sort = $state<Sort>('created: newest to oldest');

	let filteredCards = $derived.by(() => {
		let result = pages;

		// Apply search filter
		if (search.trim()) {
			const searchTerm = search.toLowerCase().trim();
			result = result.filter((card) => card.channel.toLowerCase().includes(searchTerm));
		}

		// Apply sorting
		switch (sort) {
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
			case 'live viewers: highest to lowest':
				result = [...result].sort((a, b) => (b.pageViewers || 0) - (a.pageViewers || 0));
				break;
			case 'live viewers: lowest to highest':
				result = [...result].sort((a, b) => (a.pageViewers || 0) - (b.pageViewers || 0));
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

	function handleSearch(term: string) {
		search = term;
	}

	function handleSort(sortKey: string) {
		sort = sortKey as Sort;
	}
</script>

<CardHolder
	title="Pages"
	searchPlaceholder="Name"
	{handleSearch}
	{sortOptions}
	defaultSort={sort}
	{handleSort}
	cardCount={filteredCards.length}
>
	<div class="cards">
		{#each filteredCards as page (page.id)}
			<PageCard {page} />
		{/each}
	</div>
</CardHolder>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
		gap: 1rem;
	}
</style>
