# Svelte Logic, Events, and Reactivity

## Config Adjustments

```json
{
    "semi": false
}
```

```js
'svelte/no-inspect': 'off'
```

## Button Component 

```svelte
<!-- src/lib/Button.svelte -->
<button>Hello</button>
```

```svelte
<!-- src/routes/+page.svelte -->
<script lang="js">
    import Button from '$lib/Button.svelte'
</script>

<Button />
```

```diff
<!-- src/lib/Button.svelte -->
+ <script lang="js">
+     function handle_click() {
+         window.alert('Hello there!')
+     }
+ </script>

- <button>Hello</button>
+ <button onclick={handle_click}>Hello</button>
```

```diff
<!-- src/routes/+page.svelte -->
<script lang="js">
    import Button from '$lib/Button.svelte'

+   let status = $state(true)

+	$inspect('status:', status)
</script>

+ {#if status}
+ 	<hr />
+ 	<Button />
+ {/if}
```

```diff
<script lang="ts">
	import Button from '$lib/Button.svelte'

	let status = $state(true)

+ 	function toggle_component() {
+ 		status = !status
+ 	}

	$inspect('status:', status)
</script>

+ <button onclick={toggle_component}>Toggle Component</button>

{#if status}
	<hr />
	<Button />
{/if}
```

## Counter Component

```svelte
<!-- src/lib/Counter.svelte -->
<script lang="ts">
	let count = $state(0)
	let doubled = $derived(count * 2)
</script>

<h2>Counter</h2>
<ul>
	<li>Count: {count}</li>
	<li>Doubled: {doubled}</li>
</ul>

<div>
	<button onclick={() => count--}>-</button>
	<input type="number" bind:value={count} />
	<button onclick={() => count++}>+</button>
</div>

<style>
	div {
		column-gap: 0.5rem;
		display: flex;

		button {
			min-width: 80px;
		}
	}
</style>
```

```diff
<!-- src/routes/+page.svelte -->
<script lang="ts">
+	import Counter from '$lib/Counter.svelte'
	import Button from '$lib/Button.svelte'

	let status = $state(true)

	function toggle_component() {
		status = !status
	}

	$inspect('status:', status)
</script>

<button onclick={toggle_component}>Toggle Component</button>

{#if status}
	<hr />
	<Button />
{/if}

+ <Counter />
```

## List Component

```js
// src/lib/data.js
export const data = [
	{
		id: 1,
		name: 'John',
		age: 30,
		email: 'john@example.com'
	},
	{
		id: 2,
		name: 'Jane',
		age: 20,
		email: 'jane@example.com'
	}
]
```

```svelte
<!-- src/lib/List.svelte -->
<script lang="ts">
	let { data } = $props()
</script>

<h2>List Component</h2>

{#if data.length > 0}
	<ul>
		{#each data as item (item.id)}
			<li>
				{item.id}: <a href="mailto:{item.email}">{item.name}</a> is {item.age} year{#if item.age > 1}s{/if}
				old
			</li>
		{/each}
	</ul>
{:else}
	<p>No data provided</p>
{/if}
```

```diff
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Counter from '$lib/Counter.svelte'
	import Button from '$lib/Button.svelte'
	import List from '$lib/List.svelte'
+	import { data } from '$lib/data'

	let status = $state(true)

	function toggle_component() {
		status = !status
	}

	$inspect('status:', status)
</script>

<button onclick={toggle_component}>Toggle Component</button>

{#if status}
	<hr />
	<Button />
{/if}

<Counter />
+ <List {data} />
```

