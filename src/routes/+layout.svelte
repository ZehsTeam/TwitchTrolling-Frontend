<script lang="ts">
	import '../app.css';

	let { children } = $props();

	const title = 'TwitchTrolling';
	const description =
		'Let Twitch chat spawn monsters and trigger events with custom bit amounts and subs. Highly configurable, easy to use, no extension or app needed.';
	const image = '/icon.png'; // Must be in static/
	const siteUrl = 'https://twitchtrolling.com';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={siteUrl + image} />
	<meta property="og:url" content={siteUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={siteUrl + image} />
</svelte:head>

{@render children()}
