# Svelte Actions

## Separate files for flexibility

```javascript
// src/lib/actions/log_click.js
export default function log_click(node) {
  // Add an event listener for the 'click' event
  node.addEventListener('click', () => {
    console.log('Element clicked!');
  });

  return {
    // On destroy, make sure to remove the event listener
    destroy() {
      node.removeEventListener('click', () => {
         console.log('Element removed!');
      });
    }
  };
}
```

```html
<!-- src/lib/Component.svelte -->
<script>
  import log_click from './log_click.js';
</script>

<button use:log_click>Click me</button>
```

## Update route

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Component from '$lib/Component.svelte'
</script>

<Component />
```

## Add parameters

```diff
# log_click.js
- export default function log_click(node) {
+ export default function log_click(node, { message = 'Element clicked' } = {}) {
  node.addEventListener('click', () => {
-   console.log('Element clicked!');
+   console.log(message);
  });

  return {
    destroy() {
      node.removeEventListener('click', () => {
-       console.log('Element clicked!');
+       console.log(message);
      });
    }
  };
}
```

```html
<!-- Component.svelte -->
<script>
  import log_click from './log_click.js';
</script>

<button use:log_click>Click me</button>
<button use:log_click={{ message: 'Button was clicked' }}>Click me</button>
```
---

