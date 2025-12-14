<script lang="js">
	// import components
	let { children } = $props();
	import favicon from '$lib/assets/favicon.webp';
</script>

<svelte:head>
	<link rel="icon" href={favicon}/>
</svelte:head>

{@render children()}