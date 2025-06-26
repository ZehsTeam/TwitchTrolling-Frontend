<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { PageState, PageData, CardData } from '$lib/types';
	import { enemyImageMap, eventImageMap } from '$lib/imageMaps';
	import Header from '../Header.svelte';
	import CardList from './CardList.svelte';
	import PageInfo from './PageInfo.svelte';

	const apiOrigin = 'https://twitchtrolling.up.railway.app';

	let pageState = $state<PageState>('loading');

	let pageId: string | null = null;

	let channel = $state('');
	let enemies = $state<CardData[]>([]);
	let events = $state<CardData[]>([]);
	let expiresAt = $state('');

	let eventSource: EventSource | null = null;
	let sseClosed = false;

	let countdown = $state('');

	let countdownInterval: ReturnType<typeof setInterval> | null = null;

	async function fetchPageData() {
		if (!pageId) {
			pageState = 'not found';
			return;
		}

		pageState = 'loading';

		try {
			const res = await fetch(`${apiOrigin}/api/pages/${pageId}`);

			if (!res.ok) {
				pageState = 'not found';
				throw new Error('Failed to fetch page data');
			}

			const data: PageData = await res.json();
			handlePageData(data);

			pageState = 'loaded';
		} catch (err) {
			console.error('Fetch error:', err);

			handlePageData({
				channel: '',
				enemies: [],
				events: [],
				expiresAt: ''
			});

			pageState = 'not found';
		}
	}

	function closePageSSE() {
		if (eventSource) {
			eventSource.close();
			eventSource = null;
			console.log('Closed page SSE');
		}

		sseClosed = true;
	}

	function handlePageData(data: Partial<PageData>) {
		if (data.channel) {
			channel = data.channel;
		}

		if (data.enemies) {
			enemies = data.enemies;
		}

		if (data.events) {
			events = data.events;
		}

		if (data.expiresAt) {
			expiresAt = data.expiresAt;
		}
	}

	function formatRemaining(ms: number) {
		const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		const parts = [];
		if (hours > 0) parts.push(`${hours} hr`);
		if (minutes > 0) parts.push(`${minutes} min`);
		parts.push(`${seconds} sec`);

		return parts.join(' ');
	}

	$effect(() => {
		if (!expiresAt) return;

		let stopped = false;

		const update = () => {
			if (stopped) return;

			const now = new Date();
			const target = new Date(expiresAt);
			const diff = target.getTime() - now.getTime();
			const expired = diff <= 0;

			countdown = expired ? 'Expired' : formatRemaining(diff);

			if (expired) {
				pageState = 'expired';
				clearInterval(countdownInterval!);
				stopped = true;
			}
		};

		update();
		clearInterval(countdownInterval!);

		countdownInterval = setInterval(update, 1000);

		// Clean up on invalidate
		return () => clearInterval(countdownInterval!);
	});

	$effect(() => {
		if (pageState === 'loaded' && !sseClosed && pageId && !eventSource) {
			eventSource = new EventSource(`${apiOrigin}/api/pages/${pageId}/sse`);

			eventSource.onopen = () => {
				console.log(`✅ Connected to page ${pageId} SSE`);
			};

			eventSource.onerror = () => {
				console.error('❌ SSE connection error');
			};

			eventSource.addEventListener('update', (event) => {
				try {
					const data = JSON.parse(event.data);
					handlePageData(data);
				} catch (err) {
					console.warn('Invalid SSE update payload:', event.data);
				}
			});

			eventSource.addEventListener('delete', () => {
				pageState = 'deleted';
				closePageSSE();
			});
		}

		if (pageState === 'expired' || pageState === 'deleted') {
			closePageSSE();
		}
	});

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		pageId = urlParams.get('id');

		fetchPageData();
	});

	onDestroy(() => {
		clearInterval(countdownInterval!);
		closePageSSE();
	});
</script>

<Header />

<main>
	{#if pageState === 'loading'}
		<br />
		<h2>Loading...</h2>
	{:else if pageState === 'expired'}
		<br />
		<h2>This page has expired.</h2>
	{:else if pageState === 'deleted'}
		<br />
		<h2>This page has been deleted.</h2>
	{:else if pageState == 'loaded'}
		<PageInfo {channel} {countdown} />

		{#if enemies.length || events.length}
			<div class="usage-info">
				<p>
					To spawn enemies or trigger events, simply cheer the specified amount of bits in the
					streamer's chat.
				</p>
				<p>
					If multiple enemies or events share the same bit amount, one will be chosen at random from
					that group.
				</p>
			</div>
		{/if}

		{#if enemies.length}
			<CardList title="Enemies" cards={enemies} cardImageMap={enemyImageMap} />
		{/if}

		{#if events.length}
			<CardList title="Events" cards={events} cardImageMap={eventImageMap} />
		{/if}

		{#if !enemies.length && !events.length}
			<p>No enemies or events enabled.</p>
		{/if}
	{:else}
		<br />
		<h2>This page does not exist.</h2>
	{/if}
</main>

<style>
	main {
		margin: 0 20em;
	}

	.usage-info {
		margin-bottom: 1em;
		font-size: 1.1em;
	}

	@media only screen and (max-width: 1420px) {
		main {
			margin: 0 15em;
		}
	}

	@media only screen and (max-width: 1250px) {
		main {
			margin: 0 10em;
		}
	}

	@media only screen and (max-width: 960px) {
		main {
			margin: 0 2em;
		}
	}
</style>
