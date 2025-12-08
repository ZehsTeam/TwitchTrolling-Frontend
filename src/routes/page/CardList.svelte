<script lang="ts">
	import type { CardData } from '$lib/types';
	import Card from './Card.svelte';
	import emptyImage from '$lib/media/empty.png';
	import Select from '$lib/components/ui/Select.svelte';

	let {
		title,
		cards,
		cardImageMap
	}: {
		title: string;
		cards: CardData[];
		cardImageMap?: Record<string, string>;
	} = $props();

	type CardSort =
		| 'default'
		| 'name: a-z'
		| 'name: z-a'
		| 'price: lowest to highest'
		| 'price: highest to lowest';

	let search = $state('');

	const cardSortOptions: Record<CardSort, string> = {
		default: 'Default',
		'name: a-z': 'Name: A-Z',
		'name: z-a': 'Name: Z-A',
		'price: lowest to highest': 'Price: Lowest to Highest',
		'price: highest to lowest': 'Price: Highest to Lowest'
	};

	let cardSort = $state<CardSort>('default');

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
		switch (cardSort) {
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

	function getCardImage(card: CardData) {
		if (!cardImageMap) {
			return emptyImage;
		}

		return cardImageMap[card.name] || emptyImage;
	}
</script>

<div class="card-list">
	<div class="header">
		<h2>{title} <span class="count">(x{filteredCards.length})</span></h2>
		<div class="filters">
			<div class="input-container">
				<p>Search:</p>
				<input bind:value={search} type="text" placeholder="Name or Price" />
			</div>
			<div class="input-container">
				<p>Sort by:</p>
				<Select
					options={cardSortOptions}
					value={cardSort}
					handleChanged={(value) => (cardSort = value as CardSort)}
					class="sort-select"
				/>
			</div>
		</div>
	</div>
	<div class="cards">
		{#each filteredCards as card (card._id)}
			<Card {card} image={getCardImage(card)} />
		{/each}
	</div>
</div>

<style>
	.card-list {
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
		grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
		gap: 1rem;
	}

	@media only screen and (max-width: 730px) {
		.header {
			flex-direction: column;
			align-items: start;
			gap: 1em;
		}
	}

	@media only screen and (max-width: 600px) {
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
