<script lang="ts">
	import Bit from '../Bit.svelte';
	import Star from '../Star.svelte';
	import type { CardData } from './PageState.svelte';

	let {
		card,
		image
	}: {
		card: CardData;
		image: string;
	} = $props();
</script>

<section>
	<div class="name-container">
		<p>{card.name}</p>
		{#if card.spawnCount}
			<p class="spawn-count">(Spawns x{card.spawnCount})</p>
		{:else}
			<p class="spawn-count">-</p>
		{/if}
	</div>
	<div class="image-container">
		<img src={image} alt="Icon" />
	</div>
	<div class="push-down"></div>
	<div class="price-container">
        <Bit />
		<p class="price">{card.price}</p>
		{#if card.subPrice}
			<p class="price-separator">/</p>
			<Star />
			<p class="price">{card.subPrice}</p>
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		border: var(--purple) solid 2px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		background: var(--background-light);
	}

	p {
		font-size: 1.2em;
		text-transform: uppercase;
	}

	.name-container {
		margin: 0.35rem 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.spawn-count {
		font-size: 0.8em;
		color: var(--purple-light);
		text-transform: none;
	}

	.image-container {
		width: 100%;
		height: 150px;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	}

	.push-down {
		flex-grow: 1;
	}

	.price-container {
		margin: 0.35rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.price {
		color: var(--purple-light);
	}

	.price-separator {
		margin: 0 8px;
		color: var(--white);
	}
</style>
