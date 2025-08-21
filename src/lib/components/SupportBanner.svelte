<script lang="ts">
	import Fa from 'svelte-fa';
	import { faHeart, faClose } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';

	let { show: showProp = true }: { show?: boolean } = $props();

	const closeDuration = 1000 * 60 * 60; // 60 minutes

	// persisted timestamp (ISO) or null
	let closedAt = $state<string | null>(null);

	// a ticking value so $derived can re-evaluate over time
	let now = $state<number>(Date.now());

	// compute visibility (reacts to showProp, closedAt, and 'now')
	let show = $derived(
		showProp && (!closedAt || now - new Date(closedAt).getTime() > closeDuration)
	);

	function handleClose() {
		closedAt = new Date().toISOString();
	}

	onMount(() => {
		// initial load from localStorage
		const saved = localStorage.getItem('donationClosedAt');
		closedAt = saved && saved !== '' ? saved : null;

		// tick every second so 'show' can flip back when time expires
		const interval = setInterval(() => {
			now = Date.now();
		}, 1000);

		// cross-tab sync
		const onStorage = (e: StorageEvent) => {
			if (e.key === 'donationClosedAt') {
				closedAt = e.newValue && e.newValue !== '' ? e.newValue : null;
			}
		};
		window.addEventListener('storage', onStorage);

		return () => {
			clearInterval(interval);
			window.removeEventListener('storage', onStorage);
		};
	});

	$effect(() => {
		if (closedAt == null) {
			localStorage.removeItem('donationClosedAt');
		} else {
			localStorage.setItem('donationClosedAt', closedAt);
		}
	});
</script>

<div class="support-banner {show ? '' : 'hidden'}">
	<div class="content">
		<div class="left">
			<p>
				This mod does not take a cut from the streamer. If you like this mod, please consider
				supporting on <a href="https://ko-fi.com/zehsteam" target="_blank">Ko-fi</a>
				<Fa size="sm" icon={faHeart} />
			</p>
		</div>
		<div class="right">
			<button onclick={handleClose} class="close-btn">
				<Fa size="sm" icon={faClose} />
			</button>
		</div>
	</div>
</div>

<style>
	.support-banner {
		margin-top: 1em;
		padding: 2px;
		background: linear-gradient(
			rgb(145, 70, 255) 0px,
			rgb(105, 255, 195) 61.98%,
			rgb(30, 105, 255)
		);
		border-radius: var(--border-radius-card);
	}

	.content {
		padding: 0.8em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--bg-light);
		border-radius: var(--border-radius-card);
	}

	.close-btn {
		padding: 0;
		width: 34px;
		height: 34px;
		background: none;
	}
</style>
