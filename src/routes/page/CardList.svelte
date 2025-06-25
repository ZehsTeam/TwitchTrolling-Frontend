<script lang="ts">
	import type { CardData, CardFilter, CardPriceFilter } from "$lib/types";
	import Card from "./Card.svelte";
    import emptyImage from '$lib/assets/empty.png';

    let { title, cards, cardImageMap }: {
        title: string;
        cards: CardData[];
        cardImageMap?: Record<string, string>;
    } = $props();

    let search = $state("");

    const cardFilterOptions: CardFilter[] = ['none', 'name', 'price'];
	const cardPriceFilterOptions: CardPriceFilter[] = [
		'lowest to highest',
		'highest to lowest'
	];

    const cardFilterLabels: Record<CardFilter, string> = {
        none: 'None',
        name: 'Name',
        price: 'Price'
    };
    const cardPriceFilterLabels: Record<CardPriceFilter, string> = {
        'lowest to highest': 'Lowest to Highest',
        'highest to lowest': 'Highest to Lowest'
    };

    let cardFilter = $state<CardFilter>("none");
    let cardPriceFilter = $state<CardPriceFilter>("lowest to highest");
    
    let filteredCards = $derived.by(() => {
        let result = [...cards];

        const searchTerm = search.trim().toLowerCase();
	    const isNumericSearch = /^\d+(\.\d+)?$/.test(searchTerm); // matches integers or floats

        if (searchTerm !== '') {
            if (isNumericSearch) {
                result = result.filter(card =>
                    card.price.toString().startsWith(searchTerm)
                );
            } else {
                result = result.filter(card =>
                    card.name.toLowerCase().includes(searchTerm)
                );
            }
        }

        if (cardFilter === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (cardFilter === 'price') {
            const dir = cardPriceFilter === 'lowest to highest' ? 1 : -1;
            result.sort((a, b) => (a.price - b.price) * dir);
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

<section>
    <div class="header">
        <h2>{title}</h2>
        <input bind:value={search} type="text" placeholder="Search">
        <div class="filter">
            <p>Filter:</p>
            <select bind:value={cardFilter}>
                {#each cardFilterOptions as option}
                    <option value={option}>{cardFilterLabels[option]}</option>
                {/each}
            </select>
        </div>
        {#if cardFilter === 'price'}
            <div class="filter">
                <p>Filter Price:</p>
                <select bind:value={cardPriceFilter}>
                    {#each cardPriceFilterOptions as option}
                        <option value={option}>{cardPriceFilterLabels[option]}</option>
                    {/each}
                </select>
            </div>
        {/if}
    </div>
    <div class="cards">
        {#each filteredCards as card (card._id) }
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
        align-items: center;
        gap: 2em;
    }

    .header input,
    .filter select {
        padding: 0.5em;
        border: none;
        border-radius: 3px;
    }

    .header input:focus,
    .filter select:focus {
        outline: none;
    }

    h2 {
        font-size: 1.5em;
        text-transform: uppercase;
    }

    .filter {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
        gap: 1rem;
    }

    @media only screen and (max-width: 750px) {
        .header {
            flex-direction: column;
            align-items: start;
            gap: 1em;
        }
    }
</style>