<script lang="ts">
	let {
		options,
		value,
		handleChanged,
		class: propsClass
	}: {
		options: Record<string, string>;
		value: string;
		handleChanged: (value: string) => void;
		class?: string;
	} = $props();
</script>

<select
	bind:value
	onchange={(e) => handleChanged((e.target as HTMLSelectElement).value)}
	class={propsClass}
>
	{#each Object.entries(options) as [optionKey, optionValue]}
		<option value={optionKey}>{optionValue}</option>
	{/each}
</select>

<style>
</style>
