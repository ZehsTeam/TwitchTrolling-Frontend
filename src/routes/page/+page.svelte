<script lang="ts">
    import { page } from "$app/state";
    import { onMount, onDestroy } from "svelte";
	import type { PageState, PageData } from "$lib/types";
    import { enemyImageMap, eventImageMap } from "$lib/imageMaps";
	import Header from "../Header.svelte";
	import CardList from "./CardList.svelte";
	import PageInfo from "./PageInfo.svelte";

    let pageState = $state<PageState>("loading");

    let pageId: string | null = null;

    let pageData = $state<PageData>({
        id: "",
        channel: "",
        enemies: [],
        events: [],
        expiresAt: "",
    });

    let eventSource: EventSource | null = null;
	let sseClosed = false;

    async function fetchPageData() {
        if (!pageId) {
            pageState = "not found";
            return;
        }

		pageState = "loading";

		try {
			const res = await fetch(`https://twitchtrolling.up.railway.app/api/pages/${pageId}`);

			if (!res.ok) {
                pageState = "not found";
                throw new Error('Failed to fetch page data');
            }

			const data: PageData = await res.json();
			pageData = data;
            pageState = "loaded";
		} catch (err) {
			console.error('Fetch error:', err);

			pageData = {
				id: '',
				channel: '',
				enemies: [],
				events: [],
				expiresAt: ''
			};
            pageState = "not found";
		}
    }

    function handleExpired() {
        pageState = "expired";
    }

    function handlePageUpdate(update: Partial<PageData>) {
        if (update.id) {
            pageData.id = update.id;
        }

		if (update.channel) {
            pageData.channel = update.channel;
        }

        if (update.enemies) {
            pageData.enemies = update.enemies;
        }

        if (update.events) {
            pageData.events = update.events;
        }

        if (update.expiresAt) {
            pageData.expiresAt = update.expiresAt;
        }
	}

    $effect(() => {
		if (pageState === "loaded" && !sseClosed && pageId && !eventSource) {
			eventSource = new EventSource(`https://twitchtrolling.up.railway.app/api/pages/${pageId}/sse`);

			eventSource.onopen = () => {
				console.log(`✅ Connected to page ${pageId} SSE`);
			};

			eventSource.onerror = () => {
				console.error("❌ SSE connection error");
			};

			eventSource.addEventListener("update", (event) => {
				try {
					const data = JSON.parse(event.data);
					handlePageUpdate(data);
				} catch (err) {
					console.warn("Invalid SSE update payload:", event.data);
				}
			});

			eventSource.addEventListener("delete", () => {
				pageState = "deleted";
				closePageSSE();
			});
		}

		if (pageState === "expired" || pageState === "deleted") {
			closePageSSE();
		}
	});

	function closePageSSE() {
		if (eventSource) {
			eventSource.close();
			eventSource = null;
            console.log("Closed page SSE");
		}
		sseClosed = true;
	}

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        pageId = urlParams.get('id');

        fetchPageData();
    });
    onDestroy(closePageSSE);
</script>

<Header />

<main>
    {#if pageState === "loading"}
        <br>
		<h2>Loading...</h2>
    {:else if pageState === "expired"}
        <br>
		<h2>This page has expired.</h2>
    {:else if pageState === "deleted"}
        <br>
		<h2>This page has been deleted.</h2>
	{:else if pageData.channel}
		<PageInfo channel={pageData.channel} expiresAt={pageData.expiresAt} {handleExpired} />

        <div class="usage-info">
            <p>To spawn enemies or trigger events, simply cheer the specified amount of bits in the streamer's chat.</p>
            <p>If multiple enemies or events share the same bit amount, one will be chosen at random from that group.</p>
        </div>

		{#if pageData.enemies.length}
			<CardList title="Enemies" cards={pageData.enemies} cardImageMap={enemyImageMap} />
		{/if}

		{#if pageData.events.length}
			<CardList title="Events" cards={pageData.events} cardImageMap={eventImageMap} />
		{/if}
	{:else}
        <br>
		<h2>No page found.</h2>
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