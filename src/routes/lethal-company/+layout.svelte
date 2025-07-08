<script lang="ts">
	import '../app.css';
	import { setPagesState } from '../PagesState.svelte';

	let { children } = $props();

	setPagesState('lethal-company');
</script>

{@render children()}
