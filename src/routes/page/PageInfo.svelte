<script lang="ts">
    import { onDestroy } from 'svelte';
    import twitchImage from '$lib/assets/twitch-64x64.png';

    let { channel, expiresAt, handleExpired }: {
        channel: string;
        expiresAt: string;
        handleExpired: () => void;
    } = $props();

    let countdown = $state("");

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

    let interval: ReturnType<typeof setInterval> | null = null;
    
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
                handleExpired();
                clearInterval(interval!);
                stopped = true;
            }
		};

		update();
		clearInterval(interval!);

		interval = setInterval(update, 1000);

		// Clean up on invalidate
		return () => clearInterval(interval!);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<section>
    <div class="channel-container">
        <img src="{twitchImage}" alt="twitch">
        <h2>{channel}</h2>
    </div>
    <p>Expires in: {countdown}</p>
</section>

<style>
    section {
        padding: 1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .channel-container {
        display: flex;
        align-items: center;
    }

    .channel-container img {
        width: 2em;
        height: 2em;
        margin-right: 0.5em;
    }

    .channel-container h2 {
        font-size: 1.8rem;
    }

    p {
        font-size: 1.1rem;
    }

    @media only screen and (max-width: 570px) {
        section {
            flex-direction: column;
            justify-content: start;
            align-items: start;
            gap: 8px;
        }
    }
</style>