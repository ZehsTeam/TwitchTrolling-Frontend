<script lang="ts">
	import '../app.css';
	import { setPagesState } from '../PagesState.svelte';

	let { children } = $props();

	setPagesState('repo');
</script>

{@render children()}
