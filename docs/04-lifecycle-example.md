# Lifecycle example

```svelte
<!-- src/lib/Button.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte'

	let count = $state(0)

	$effect.pre(() => {
		console.log('component start')
	})

	onMount(() => {
		console.log('Component mounted')
	})

	$effect(() => {
		console.log('component updated', count)
	})

	onDestroy(() => {
		console.log('component destroyed')
	})
</script>

<button onclick={() => count++}>{count} +1</button>
```

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Button from '$lib/Button.svelte'

	let status = $state(true)
</script>

<button onclick={() => (status = !status)}>Toggle Button Component</button>
{#if status}
	<Button />
{/if}
```
