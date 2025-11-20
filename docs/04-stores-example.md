# Svelte store example

## Initialize Button component

```svelte 
<!-- src/lib/Button.svelte -->
<script lang="js">
	$effect(() => {
		console.log('Button compoent loaded')

		return () => {
			console.log('Button component removed')
		}
	})
</script>

<button>Hello</button>
```

## Initialize route

```svelte
<!-- +page.svelte -->
<script lang="js">
	import Button from '$lib/Button.svelte'

	let status = $state(true)

	function toggle_component() {
		status = !status
	}
</script>

<button onclick={toggle_component}>Toggle Component</button>

{#if status}
	<hr />
	<Button />
{/if}
```

## Add Button component props

```html
<!-- src/lib/Button.svelte -->
<script lang="js">
  const { label = '' } = $props();
</script>

<button>{label}</button>
```

## Add Controls component props

```html
<!-- src/lib/Controls.svelte -->
<script lang="js">
  import Button from './Button.svelte';
  const { label = '' } = $props();
</script>

<Button {label} />
```

## Import Controls component into route

```html
<!-- src/routes/+page.svelte -->
<script lang="js">
  import Controls from '../lib/Controls.svelte';
</script>

<Controls label="My button label" />
```

## Create a store variable

```javascript
// src/lib/store.js
import { writable } from 'svelte/store';
export const label = writable('my default label');
```

## Swap store variable in Button component

```diff
<!-- src/lib/Button.svelte -->
<script lang="js">
+ import { label } from '$lib/store';
- const { label = '' } = $props();

+ function update_label() {
+   $label = 'My New Label';
+ }

+ $effect(() => {
+     console.log('label:', $label)
+ })

+ $inspect($label);
</script>

+ <button onclick={update_label}>{$label}</button>
```

## Swap store variable in Controls component

```diff
# src/lib/Controls.svelte
<script>
  import Button from './Button.svelte';

- const { label = '' } = $props();
</script>

- <Button {label} />
+ <Button />
```

## Use store variable in route

```diff
# src/routes/+page.svelte
<script>
  import Controls from '../lib/Controls.svelte';
+ import { label } from '../lib/store';
</script>

- <Controls label="My button label" />
+ <Controls />
+ <p>The label value: {$label}</p>
```

## Update the value

```html
<!-- src/lib/Button.svelte -->
<script lang="ts">
	import { label } from '$lib/store'
</script>

<button>{$label}</button>
```

## Add input to Controls component

```svelte
<script lang="ts">
	import Button from '$lib/Button.svelte'
	import { label } from '$lib/store'

	let the_label = $state('')

	function update_label() {
		console.log(the_label)
		$label = the_label
	}
</script>

<input type="text" bind:value={the_label} onkeyup={update_label} />
<Button />
```

## Update route

```svelte
<script lang="ts">
	import Controls from '$lib/Controls.svelte'
	import { label } from '$lib/store'
</script>

<Controls />
<p>The label value: {$label}</p>
```
