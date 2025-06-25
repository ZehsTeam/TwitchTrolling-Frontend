<script lang="ts">
    import bitsImage from '$lib/assets/bits.png';
	import type { CardData } from "$lib/types";

    let { card, image }: {
        card: CardData;
        image: string;
    } = $props();
</script>

<section>
    <div class="name-container">
        <p>{card.name}</p>
    </div>
    <div class="image-container">
        <img src="{image}" alt="card">
    </div>
    <div class="price-container">
        <img src="{bitsImage}" alt="twitch bits">
        <p>{card.price}</p>
    </div>
</section>

<style>
    section {
        width: 100%;
        border-radius: 8px;
        border: #9146FF solid 2px;
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

    .price-container p {
        color: #A78BFA;
    }
</style>