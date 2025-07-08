<script lang="ts">
	import { onMount } from 'svelte';

	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import PageCardList from '$lib/components/home/PageCardList.svelte';
</script>

<SEO />

<Header />

<Main>
	<div class="info">
		<p>
			R.E.P.O. mod to let Twitch chat spawn monsters and trigger events with custom bit amounts and
			subs. Highly configurable, easy to use, no extension or app needed.
		</p>
		<p>
			Download the <a href="https://thunderstore.io/c/repo/p/Zehs/TwitchTrolling/" target="_blank"
				>TwitchTrolling</a
			> mod on Thunderstore.
		</p>
	</div>
</Main>

<style>
	.info {
		margin: 1em 0;
	}
</style>
