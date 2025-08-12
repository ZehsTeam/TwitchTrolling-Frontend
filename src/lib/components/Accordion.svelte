<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

	let {
		title,
		open = false,
		children
	}: {
		title: string;
		open?: boolean;
		children: Snippet;
	} = $props();

	let headerElement: HTMLElement | undefined = $state(undefined);

	function handleClick() {
		open = !open;
	}

	onMount(() => {
		headerElement?.addEventListener('click', handleClick);
	});
</script>

<div class="accordion">
	<div class="header" bind:this={headerElement}>
		<h2>{title}</h2>
		<div class="icon">
			{#if open}
				<Fa size="xs" icon={faChevronUp} />
			{:else}
				<Fa size="xs" icon={faChevronDown} />
			{/if}
		</div>
	</div>

	{#if open}
		<div class="details" transition:slide>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.accordion {
		padding: 0.8em;
		background: var(--bg-light);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-card);
	}

	.header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		user-select: none;
	}

	.header:hover {
		cursor: pointer;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
