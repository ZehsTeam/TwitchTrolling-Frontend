<script lang="ts">
	import '../../app.css';
	import { setPageState } from '../../../lib/state/PageState.svelte';

	let { children } = $props();

	setPageState();
</script>

{@render children()}
