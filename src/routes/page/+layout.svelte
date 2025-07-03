<script lang="ts">
	import '../../app.css';
	import { setPageState } from './PageState.svelte';

	let { children } = $props();

	setPageState();
</script>

{@render children()}
