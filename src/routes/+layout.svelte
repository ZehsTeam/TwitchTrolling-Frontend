<script lang="ts">
	import '../app.css';
	import { setPagesState } from './PagesState.svelte';

	let { children } = $props();

	setPagesState();
</script>

{@render children()}
