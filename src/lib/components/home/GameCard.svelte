<script lang="ts">
	import { base } from '$app/paths';
	import type { GameData } from '$lib/types';

	let {
		game
	}: {
		game: GameData;
	} = $props();
</script>

<a href="{base}{game.link}">
	<section>
		<div class="left">
			<img src={game.image} alt={game.name} />
		</div>
		<div class="right">
			<h2>{game.name}</h2>
		</div>
	</section>
</a>

<style>
	section {
		height: 60px;
		padding: 0.5em;
		display: flex;
		gap: 0.5em;
		border-radius: 8px;
		border: var(--purple) solid 2px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		background: var(--background-light);
		align-items: center;
	}

	.left {
		display: flex;
		align-items: center;
		height: 100%;
	}

	img {
		max-height: 100%;
		width: auto;
		object-fit: contain;
	}

	a {
		text-decoration: none;
	}
</style>
