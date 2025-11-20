---
marp: true
class: invert
footer: 'Lifecycles'
headingDivider: 4
math: katex
paginate: true
style: |
  section::after {
    font-size: 16px;
  }
---

- [IDM364: Lifecycles](#idm364-lifecycles)
- [Lesson Objectives](#lesson-objectives)
- [Lifecycles with Svelte 5](#lifecycles-with-svelte-5)
  - [$effect.pre](#effectpre)
  - [onMount](#onmount)
  - [$effect](#effect)
  - [onDestroy](#ondestroy)

# IDM364: Lifecycles

# Lesson Objectives

* Understanding the Svelte 5 lifecycle functions
* Introduce `$effect.pre`
* Introduce `onMount`
* Introduce `$effect`
* Introduce `onDestroy`

# Lifecycles with Svelte 5

<!-- In Svelte 5, the component lifecycle consists of its creation and destruction. Updates are handled through effects that react to state changes. The key lifecycle hooks are `$effect.pre`, `onMount`, `$effect`, and `onDestroy`. -->

## $effect.pre

<!-- `$effect.pre` runs before the DOM is updated in response to state changes it depends on. It provides granular control over pre-update logic. -->

```js
<script>
  import { tick } from 'svelte';

  $effect.pre(() => {
    console.log('the component is about to update');
    tick().then(() => {
      console.log('the component just updated');
    });
  });
</script>
```

## onMount

<!-- `onMount` runs after the component is mounted to the DOM. It's useful for initialization that requires the DOM. -->

```js
<script>
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('the component has mounted');
  });
</script>
```

--- 

<!-- It can return a cleanup function for unmount: -->

```js
<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const interval = setInterval(() => {
      console.log('beep');
    }, 1000);

    return () => clearInterval(interval);
  });
</script>
```

<!-- - Does not run on server-side rendered components. -->
<!-- - Cleanup is synchronous. -->

## $effect

<!-- In Svelte 5 with runes, you can often replace `onMount` with `$effect` for similar behavior. -->

<style scoped>
code {
  font-size: 20px;
}
</style>

<!-- `$effect` runs after the DOM is updated when dependencies change. It's a unified way to handle side effects. -->

```js
<script>
  let count = $state(0);

  $effect(() => {
    console.log('Effect running, count is:', count);

    return () => {
      console.log('Cleaning up effect');
    };
  });
</script>

<button onclick={() => count++}>Count: {count}</button>
```

--- 

<style scoped>
code {
  font-size: 18px;
}
</style>

<!-- For data fetching: -->

```js
<script>
  let users = $state([]);

  $effect(async () => {
    const response = await fetch('https://api.example.com/users');
    users = await response.json();

    return () => {
      users = []; // Cleanup if needed
    };
  });
</script>

{#each users as user}
  <p>{user.name}</p>
{/each}
```

--- 

<style scoped>
code {
  font-size: 18px;
}
</style>

<!-- For managing side effects like event listeners: -->

```js
<script>
  let width = $state(window.innerWidth);

  $effect(() => {
    const handle_resize = () => {
      width = window.innerWidth;
    };

    window.addEventListener('resize', handle_resize);

    return () => {
      window.removeEventListener('resize', handle_resize);
    };
  });
</script>

<p>Window width: {width}px</p>
```

--- 

<style scoped>
code {
  font-size: 18px;
}
</style>

<!-- Conditional effects: -->

```js
<script>
  let is_active = $state(false);
  let count = $state(0);

  $effect(() => {
    if (!is_active) return;

    const interval = setInterval(() => {
      count++;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<button onclick={() => is_active = !is_active}>
  {is_active ? 'Stop' : 'Start'} Counter
</button>
{#if is_active}
  <p>Count: {count}</p>
{/if}
```

<!-- - Automatic dependency tracking. -->
<!-- - Supports async. -->
<!-- - Cleanup runs before re-execution or destruction. -->

## onDestroy

<!-- `onDestroy` runs immediately before the component is unmounted. Useful for final cleanup. -->

```js
<script>
  import { onDestroy } from 'svelte';

  onDestroy(() => {
    console.log('the component is being destroyed');
  });
</script>
```

<!-- - Runs on both client and server. -->
<!-- - In Svelte 5, cleanups from `$effect` often handle what `onDestroy` did in Svelte 4. -->
