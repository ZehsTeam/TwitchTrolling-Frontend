<script lang="ts">
	import Select from '$lib/components/ui/Select.svelte';
	import type { Snippet } from 'svelte';

	let {
		title,
		searchPlaceholder,
		handleSearch,
		sortOptions = {},
		defaultSort = 'default',
		handleSort,
		cardCount,
		children
	}: {
		title: string;
		searchPlaceholder?: string;
		handleSearch?: (term: string) => void;
		sortOptions?: Record<string, string>; // key: internal value, value: label
		defaultSort?: string;
		handleSort?: (sortKey: string) => void;
		cardCount?: number;
		children: Snippet;
	} = $props();
</script>

<section>
	<div class="header">
		<h2>
			{title}
			{#if cardCount}
				<span class="count">(x{cardCount})</span>
			{/if}
		</h2>
		<div class="filters">
			{#if handleSearch}
				<div class="input-container">
					<p>Search:</p>
					<input
						oninput={(e) => handleSearch((e.target as HTMLInputElement).value)}
						type="text"
						placeholder={searchPlaceholder}
					/>
				</div>
			{/if}
			{#if handleSort && Object.keys(sortOptions).length}
				<div class="input-container">
					<p>Sort by:</p>
					<Select options={sortOptions} value={defaultSort} handleChanged={handleSort} />
				</div>
			{/if}
		</div>
	</div>
	<div>
		{@render children()}
	</div>
</section>

<style>
	section {
		margin-bottom: 2em;
	}

	.header {
		margin-bottom: 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
	}

	.count {
		font-size: 1.2rem;
		color: var(--purple-light);
		text-transform: none;
	}

	.filters {
		display: flex;
		gap: 2em;
	}

	.input-container {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	h2 {
		font-size: 1.5em;
		text-transform: uppercase;
	}

	@media only screen and (max-width: 650px) {
		.header {
			flex-direction: column;
			align-items: start;
			gap: 1em;
		}
	}

	@media only screen and (max-width: 570px) {
		.filters {
			flex-direction: column;
			gap: 1em;
		}
	}
</style>
