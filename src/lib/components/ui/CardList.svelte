<script lang="ts">
	import { onMount } from 'svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import type { BaseListItem } from '$lib/types';

	let {
		title,
		cards,
		renderCard,
		searchPlaceholder = 'Search...',
		getSearchMatch,
		sortOptions = {},
		defaultSort = 'default',
		getSortValue
	}: {
		title: string;
		cards: BaseListItem[];
		renderCard: (card: BaseListItem) => any;
		searchPlaceholder?: string;
		getSearchMatch?: (card: BaseListItem, term: string) => boolean;
		sortOptions?: Record<string, string>; // key: internal value, value: label
		defaultSort?: string;
		getSortValue?: (card: BaseListItem, sortKey: string) => any;
	} = $props();

	let search = $state('');
	let selectedSort = $state('default');

	let filteredCards = $derived.by(() => {
		let result = [...cards];

		const term = search.trim().toLowerCase();

		if (term && getSearchMatch) {
			result = result.filter((card) => getSearchMatch(card, term));
		}

		if (selectedSort !== 'default' && getSortValue) {
			result.sort((a, b) => {
				const aVal = getSortValue(a, selectedSort);
				const bVal = getSortValue(b, selectedSort);

				return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
			});
		}

		return result;
	});

	onMount(() => {
		if (searchPlaceholder === '') searchPlaceholder = title;
	});
</script>

<section>
	<div class="header">
		<h2>{title} <span class="count">(x{filteredCards.length})</span></h2>
		<div class="filters">
			{#if getSearchMatch}
				<div class="input-container">
					<p>Search:</p>
					<input bind:value={search} type="text" placeholder={searchPlaceholder} />
				</div>
			{/if}
			{#if getSortValue && sortOptions.length}
				<div class="input-container">
					<p>Sort by:</p>
					<Select
						options={sortOptions}
						value={defaultSort}
						handleChanged={(value) => (selectedSort = value)}
					/>
				</div>
			{/if}
		</div>
	</div>
	<div class="cards">
		{#each filteredCards as card (card.getId())}
			{@html renderCard(card)}
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
		color: var(--purple-light);
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
