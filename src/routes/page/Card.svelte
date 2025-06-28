<script lang="ts">
	import bitsImage from '$lib/assets/bits.png';
	import type { CardData } from '$lib/types';

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
		<p>
			{card.name}
			{#if card.spawnCount}
				<span class="spawn-count">(x{card.spawnCount})</span>
			{/if}
		</p>
	</div>
	<div class="image-container">
		<img src={image} alt="card" />
	</div>
	<div class="price-container">
		<img src={bitsImage} alt="twitch bits" />
		<p class="price">{card.price}</p>
		{#if card.subPrice}
			<p class="price-separator">/</p>
			<svg viewBox="0 0 20 20" aria-hidden="true"
				><path
					fill-rule="evenodd"
					d="M11.456 8.255 10 5.125l-1.456 3.13-3.49.485 2.552 2.516-.616 3.485L10 13.064l3.01 1.677-.616-3.485 2.553-2.516-3.491-.485zM7.19 6.424l-4.2.583c-.932.13-1.318 1.209-.664 1.853l3.128 3.083-.755 4.272c-.163.92.876 1.603 1.722 1.132L10 15.354l3.579 1.993c.846.47 1.885-.212 1.722-1.132l-.755-4.272 3.128-3.083c.654-.644.268-1.723-.664-1.853l-4.2-.583-1.754-3.77c-.406-.872-1.706-.872-2.112 0L7.19 6.424z"
					clip-rule="evenodd"
				></path></svg
			>
			<p class="price">{card.subPrice}</p>
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		border-radius: 8px;
		border: #9146ff solid 2px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		background: #201c24;
	}

	p {
		font-size: 1.2em;
		text-transform: uppercase;
	}

	.name-container {
		margin: 0.35rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.spawn-count {
		font-size: 0.8em;
		color: #a78bfa;
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

	.price-container {
		margin: 0.35rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.price-container img {
		width: 15px;
		height: 15px;
		margin-right: 4px;
	}

	.price-container svg {
		width: 17px;
		height: 17px;
		margin-right: 4px;
		fill: #a78bfa;
	}

	.price-container img,
	.price-container svg {
		transform: translateY(-2px);
	}

	.price {
		color: #a78bfa;
	}

	.price-separator {
		margin: 0 8px;
		color: #efeff1;
	}
</style>
