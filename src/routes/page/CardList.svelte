<script lang="ts">
	import type { CardData, CardSort, CardSortPrice } from '$lib/types';
	import Card from './Card.svelte';
	import emptyImage from '$lib/assets/empty.png';
	import Select from '../Select.svelte';

	let {
		title,
		cards,
		cardImageMap
	}: {
		title: string;
		cards: CardData[];
		cardImageMap?: Record<string, string>;
	} = $props();

	let search = $state('');

	const cardSortOptions: Record<CardSort, string> = {
		default: 'Default',
		name: 'Name'
	};

	const cardSortPriceOptions: Record<CardSortPrice, string> = {
		default: 'Default',
		'lowest to highest': 'Lowest to Highest',
		'highest to lowest': 'Highest to Lowest'
	};

	let cardSort = $state<CardSort>('default');
	let cardSortPrice = $state<CardSortPrice>('default');

	let filteredCards = $derived.by(() => {
		let result = [...cards];

		const searchTerm = search.trim().toLowerCase();
		const isNumericSearch = /^\d+(\.\d+)?$/.test(searchTerm); // matches integers or floats

		if (searchTerm !== '') {
			if (isNumericSearch) {
				result = result.filter((card) => card.price.toString().startsWith(searchTerm));
			} else {
				result = result.filter((card) => card.name.toLowerCase().includes(searchTerm));
			}
		}

		result.sort((a, b) => {
			if (cardSort === 'name') {
				const nameCompare = a.name.localeCompare(b.name);
				if (nameCompare !== 0) return nameCompare;
			}

			if (cardSortPrice !== 'default') {
				const dir = cardSortPrice === 'lowest to highest' ? 1 : -1;
				return (a.price - b.price) * dir;
			}

			return 0;
		});

		return result;
	});

	function getCardImage(card: CardData) {
		if (!cardImageMap) {
			return emptyImage;
		}

		return cardImageMap[card.name] || emptyImage;
	}
</script>

<section>
	<div class="header">
		<h2>{title}</h2>
		<div class="filters">
			<div class="input-container">
				<p>Search:</p>
				<input bind:value={search} type="text" placeholder="Name or price" />
			</div>
			<div class="input-container">
				<p>Sort:</p>
				<Select
					options={cardSortOptions}
					value={cardSort}
					handleChanged={(value) => (cardSort = value as CardSort)}
				/>
			</div>
			<div class="input-container">
				<p>Sort Price:</p>
				<Select
					options={cardSortPriceOptions}
					value={cardSortPrice}
					handleChanged={(value) => (cardSortPrice = value as CardSortPrice)}
				/>
			</div>
		</div>
	</div>
	<div class="cards">
		{#each filteredCards as card (card._id)}
			<Card {card} image={getCardImage(card)} />
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

	@media only screen and (max-width: 1070px) {
		.header {
			flex-direction: column;
			align-items: start;
			gap: 1em;
		}
	}

	@media only screen and (max-width: 990px) {
		.filters {
			flex-direction: column;
			gap: 1em;
		}
	}
</style>
