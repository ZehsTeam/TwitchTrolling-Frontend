<script lang="ts">
	import type { EffectData } from '$lib/state/repo/PageState.svelte';
	import CardHolder from '$lib/components/ui/CardHolder.svelte';
	import EffectCard from '$lib/components/repo/EffectCard.svelte';
	import emptyImage from '$lib/media/empty.png';

	let {
		title,
		searchPlaceholder,
		defaultSort = 'default',
		cards,
		cardImageMap
	}: {
		title: string;
		searchPlaceholder: string;
		defaultSort: Sort;
		cards: EffectData[];
		cardImageMap?: Record<string, string>;
	} = $props();

	let search = $state('');

	type Sort =
		| 'default'
		| 'name: a-z'
		| 'name: z-a'
		| 'price: lowest to highest'
		| 'price: highest to lowest';

	const sortOptions: Record<Sort, string> = {
		default: 'Default',
		'name: a-z': 'Name: A-Z',
		'name: z-a': 'Name: Z-A',
		'price: lowest to highest': 'Price: Lowest to Highest',
		'price: highest to lowest': 'Price: Highest to Lowest'
	};

	let sort = $state<Sort>(defaultSort);

	let filteredCards = $derived.by(() => {
		let result = cards;

		// Apply search filter
		if (search.trim()) {
			const searchTerm = search.toLowerCase().trim();
			result = result.filter(
				(card) =>
					card.name.toLowerCase().includes(searchTerm) ||
					card.price.toString().startsWith(searchTerm)
			);
		}

		// Apply sorting
		switch (sort) {
			case 'name: a-z':
				result = [...result].sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'name: z-a':
				result = [...result].sort((a, b) => b.name.localeCompare(a.name));
				break;
			case 'price: lowest to highest':
				result = [...result].sort((a, b) => a.price - b.price);
				break;
			case 'price: highest to lowest':
				result = [...result].sort((a, b) => b.price - a.price);
				break;
		}

		return result;
	});

	function getCardImage(card: EffectData) {
		if (!cardImageMap) {
			return emptyImage;
		}

		return cardImageMap[card.name] || emptyImage;
	}

	function handleSearch(term: string) {
		search = term;
	}

	function handleSort(sortKey: string) {
		sort = sortKey as Sort;
	}
</script>

<CardHolder
	{title}
	{searchPlaceholder}
	{handleSearch}
	{sortOptions}
	defaultSort={sort}
	{handleSort}
	cardCount={filteredCards.length}
>
	<div class="cards">
		{#each filteredCards as card (card._id)}
			<EffectCard {card} image={getCardImage(card)} />
		{/each}
	</div>
</CardHolder>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
		gap: 1rem;
	}
</style>
