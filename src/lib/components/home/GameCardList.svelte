<script lang="ts">
	import type { GameData } from '$lib/types';
	import CardHolder from '$lib/components/ui/CardHolder.svelte';
	import GameCard from '$lib/components/home/GameCard.svelte';
	import repoImage from '$lib/media/games/repo.webp';
	import lethalCompanyImage from '$lib/media/games/lethal-company.webp';

	let games = $state<GameData[]>([
		{
			name: 'R.E.P.O.',
			link: '/repo',
			image: repoImage
		},
		{
			name: 'Lethal Company',
			link: '/lethal-company',
			image: lethalCompanyImage
		}
	]);
</script>

<CardHolder title="Games" cardCount={games.length}>
	<div class="cards">
		{#each games as game (game.name)}
			<GameCard {game} />
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
