<script lang="ts">
	let {
		options,
		value,
		handleChanged
	}: {
		options: Record<string, string>;
		value: string;
		handleChanged: (value: string) => void;
	} = $props();
</script>

<select bind:value onchange={(e) => handleChanged((e.target as HTMLSelectElement).value)}>
	{#each Object.entries(options) as [optionKey, optionValue]}
		<option value={optionKey}>{optionValue}</option>
	{/each}
</select>

<style>
</style>
