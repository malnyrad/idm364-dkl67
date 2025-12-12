<script lang="js">
	let { children } = $props();

	// import favicon
	import favicon from '$lib/assets/favicon.webp';
</script>

<svelte:head>
	<link rel="icon" href={favicon}/>
</svelte:head>

{@render children()}