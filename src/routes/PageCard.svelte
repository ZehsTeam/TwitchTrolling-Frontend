<script lang="ts">
	import type { PageCardData } from "$lib/types";
    import twitchImage from '$lib/assets/twitch-64x64.png';

    let { page }: {
        page: PageCardData
    } = $props();

    let createdAgo = $derived.by(() => timeAgo(page.createdAt));
    let updatedAgo = $derived.by(() => timeAgo(page.updatedAt));
    let expiresIn = $derived.by(() => formatRemaining(getRemaining(page.expiresAt)));

    function timeAgo(date: string) {
        const now = new Date();
        const target = new Date(date);
        const diff = Math.max(now.getTime() - target.getTime(), 0);

        const totalSeconds = Math.floor(diff / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);

        const parts = [];
        if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
        if (hours > 0) parts.push(`${hours} hr${hours > 1 ? 's' : ''}`);
        if (minutes > 0) {
            parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
        } else if (parts.length === 0) {
            parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);
        }

        return parts.join(' ');
    }

    function getRemaining(date: string) {
        const now = new Date();
        const target = new Date(date);
        const diff = target.getTime() - now.getTime();
        return Math.max(diff, 0);
    }

    function formatRemaining(ms: number) {
        const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const parts = [];
        if (hours > 0) parts.push(`${hours} hr${hours > 1 ? 's' : ''}`);
        if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);

        if (seconds > 0 && parts.length === 0) {
            parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);
        }

        return parts.join(' ');
    }
</script>

<a href="/page?id={page.id}">
    <section>
        <div class="top">
            <img src="{twitchImage}" alt="Twitch">
            <h2>{page.channel}</h2>
        </div>
        <div class="bottom">
            <p>Created {createdAgo} ago</p>
            <p>Last updated {updatedAgo} ago</p>
            <p>Expires in {expiresIn}</p>
        </div>
    </section>
</a>

<style>
    section {
        padding: 0.5em;
		border-radius: 8px;
		border: #9146ff solid 2px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		background: #201c24;
	}

    img {
        width: 1.5em;
		height: 1.5em;
		margin-right: 0.5em;
    }

    a {
        text-decoration: none;
    }

    .top {
        display: flex;
        align-items: center;
    }

    .bottom p {
        color: #adadb8;
    }
</style>