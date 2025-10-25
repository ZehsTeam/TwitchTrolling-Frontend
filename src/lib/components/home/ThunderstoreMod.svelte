<script lang="ts">
	import { onMount } from 'svelte';
	import type { ThunderstorePackage } from '$lib/thunderstoreApi';
	import { FetchThunderstorePackage } from '$lib/thunderstoreApi';

	let {
		name,
		namespace,
        game
	}: {
		name: string;
		namespace: string;
        game?: string;
	} = $props();

	let data = $state<ThunderstorePackage | null>(null);

	onMount(() => {
		fetchData();
	});

	async function fetchData() {
		data = await FetchThunderstorePackage(name, namespace);
	}

    function handleDownload() {
        if (data === null)
            return;

        const url = `https://thunderstore.io/c/${data.community_listings[0].community}/p/${data.latest.namespace}/${data.latest.name}`;

        window.open(url, '_blank');
    }
</script>

{#if data}
	<div class="thunderstore-mod">
		<div class="icon-container">
			<img src={data.latest.icon} alt="icon" class="icon" />
		</div>
		<div class="content-container">
			<div class="info-container">
                {#if game}
                    <h2 class="name">{data.latest.name} for {game}</h2>
                {:else}
                    <h2 class="name">{data.latest.name}</h2>
                {/if}
				<p class="description">{data.latest.description}</p>
			</div>
            <div class="push-down"></div>
            <div class="stats-container">
                <p>Version {data.latest.version_number}</p>
                <p>{data.latest.downloads} Downloads</p>
            </div>
			<div class="button-container">
				<button onclick={handleDownload}>Download</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.thunderstore-mod {
		padding: 0.5em;
		display: flex;
        flex-direction: row;
		gap: 0.5em;
		background: var(--bg-light);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-card);
	}

	.content-container {
		display: flex;
		gap: 0.5em;
		flex-direction: column;
	}

    .push-down {
        flex: 1;   
    }

	.icon {
        height: 150px;
	}

    .stats-container {
        display: flex;
        gap: 0.75em;
    }

    .stats-container p:not(:last-child)::after {
        content: '/';
		margin-left: 0.75em;
		color: var(--text-muted);
    }

	.button-container {
		display: flex;
		gap: 0.5em;
	}

    @media only screen and (max-width: 1600px) {
        .icon-container {
            display: none;
        }
	}
</style>
