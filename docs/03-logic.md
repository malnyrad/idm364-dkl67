---
marp: true
class: invert
footer: 'Logic'
headingDivider: 4
math: katex
paginate: true
style: |
  section::after {
    font-size: 16px;
  }
---

- [IDM364: Logic](#idm364-logic)
- [Lesson Objectives](#lesson-objectives)
- [Svelte Logic](#svelte-logic)
  - [React example](#react-example)
  - [`if` block](#if-block)
  - [`else` block](#else-block)
  - [`else if`](#else-if)
  - [`each` block](#each-block)
  - [`each` blocks with `else`](#each-blocks-with-else)
  - [Keyed `each` Blocks](#keyed-each-blocks)
  - [Working with objects](#working-with-objects)

# IDM364: Logic

# Lesson Objectives

* Introduce Svelte Logic

# Svelte Logic

<!-- Svelte allows you to add logic directly in your markup to control what should be rendered. -->

## React example

```javascript
const MyComponent = () => {
  let is_visible = true;

  return (
    {
      is_visible ? <p>The paragraph is visible.</p> : ''
    }
  )
}
```

<!-- Anyone familiar with React knows the ternary operator and the process for conditionally rendering content in a component. Svelte handles this type of work much more elegantly. -->

## `if` block

<!-- The basic `if` block is one of the control flow structures that Svelte offers. Using this block, you can conditionally render content based on the current state of your data. -->

<!-- Here's a straightforward example: -->

```html
<script>
  let is_visible = true;
</script>

{#if is_visible}
  <p>The paragraph is visible.</p>
{/if}
```

<!-- The `if` block in Svelte is denoted by `{#if condition}...{/if}`, where `condition` is any JavaScript expression that evaluates to a boolean. If the `condition` evaluates to `true`, the content inside the `if` block is rendered. -->

<!-- In the above example, because `is_visible` is `true`, "The paragraph is visible." is displayed. If `is_visible` becomes `false`, the paragraph won't be displayed. -->

## `else` block

<!-- Often, you need to display a fallback or an alternate content when the `if` condition isn't met. This requires an `else` clause: -->

```html
<script>
  let is_visible = false;
</script>

{#if is_visible}
  <p>The paragraph is visible.</p>
{:else}
  <p>The paragraph is not visible.</p>
{/if}
```

<!-- Here, since `is_visible` is `false`, the content in the `else` block is rendered instead. So, "The paragraph is not visible." is displayed. -->

## `else if`

<!-- Svelte also allows you to have multiple complex conditions using the `else if` clause: -->

```html
<script>
  let weather = 'rainy';
</script>

{#if weather === 'sunny'}
  <p>It's sunny outside!</p>
{:else if weather === 'rainy'}
  <p>It's raining outside!</p>
{:else}
  <p>Weather is unpredictable!</p>
{/if}
```

<!-- Here, depending upon the value of `weather`, different content will be rendered. If none of the `if` and `else if` conditions are met, then the `else` block's content is rendered. -->

<!-- To summarize, `if` blocks in Svelte allow you to conditionally render content based on your component's state. They provide a declarative way to manage your dynamic content rendering and are a vital part of Svelte's logic system. -->

## `each` block

<!-- Svelte offers an `each` block, which you can use to iterate over arrays and objects and render repeating UI elements. -->

<!-- Here's a simple use of an `each` block: -->

```html
<script>
  let numbers = [1, 2, 3, 4, 5];
</script>

<ul>
  {#each numbers as number}
    <li>{number}</li>
  {/each}
</ul>
```

<!-- Here, the `each` block is iterating over the `numbers` array. For each number in the `numbers` array, a list item `<li>` is rendered containing the number. -->

---

<!-- You can also destructure your data straight within `each`: -->

```html
<script>
  let persons = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' }
  ];
</script>

<ul>
  {#each persons as { name }}
    <li>{name}</li>
  {/each}
</ul>
```

<!-- Here, for each person in `persons`, a `{ name }` object is destructured and used to display a list item. -->

## `each` blocks with `else`

<!-- You can include an `else` block which will be displayed if the array you're iterating over is empty: -->

```html
<script>
  let numbers = [];
</script>

<ul>
  {#each numbers as number}
    <li>{number}</li>
  {:else}
    <li>No numbers to display.</li>
  {/each}
</ul>
```

<!-- In this case, because `numbers` is empty, the `else` block will be rendered, displaying "No numbers to display." -->

## Keyed `each` Blocks

<!-- In some scenarios, it's beneficial to use a keyed `each` block to help Svelte identify nodes within lists. This is particularly useful when working with lists that can change over time (items added, removed, or reordered), as it can improve performance and help avoid errors. -->

<!-- In a keyed `each` block, you provide a unique identifier (key) for each item in the list. The syntax is `{#each list as item (key)}`. -->

---

<!-- Let's consider an example: -->

```html
<script>
  let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
</script>

<ul>
  {#each users as user (user.id)}
    <li>{user.name}</li>
  {/each}
</ul>
```

<!-- In this example, we're looping through `users`, and for each `user`, we specify `user.id` as the key. This key should uniquely identify each user in the list. -->

---

<!-- Now, if `users` changes because users are added, removed, or reordered, Svelte will use these keys to reuse existing nodes where possible, rather than tearing down and rebuilding the entire list. This can contribute to a better performance. -->

```html
<script>
  let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
</script>
```

---

<!-- When comparing this approach with a regular `each` block (without keys), consider a situation where the order of our users changes. In a non-keyed `each` block, Svelte would simply reorder the DOM elements in place. However, in a keyed `each` block, Svelte will move the entire DOM elements around to match the new order. The nodes are preserved, meaning that any state associated with those DOM nodes (like input focus) is maintained. -->

```html
<ul>
  {#each users as user (user.id)}
    <li>{user.name}</li>
  {/each}
</ul>

<button onclick={() => users = [
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice' },
    { id: 3, name: 'Charlie' }
  ]
}>
  Swap Alice and Bob
</button>
```

---

<!-- When you click the "Swap Alice and Bob" button with the keyed each block, Svelte will keep the individual list items in the same order in the DOM and just update the data within those items — "Alice" and "Bob" will swap places. -->

```html
<ul>
  {#each users as user}
    <li>{user.name}</li>
  {/each}
</ul>

<button onclick={() => users = [
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice' },
    { id: 3, name: 'Charlie' }
  ]
}>
  Swap Alice and Bob
</button>

```

<!-- When using a non-keyed each block and clicking the "Swap Alice and Bob" button, Svelte will update the data in-place — "Alice" and "Bob" will remain in the same place in the DOM, but their data (names) will be swapped. -->

<!-- This difference might not be visible in a simple list, but can have serious implications in more complex lists. If a list item includes inputs and you're using a keyed each block, swapping the data will retain input focus, selection, etc., making it better from a UX perspective. With a non-keyed each block, swapping data will also swap the input state, which is often not what users expect. -->

## Working with objects

<!-- Svelte's `each` block primarily works with lists (arrays). However, you can iterate over an object's properties by first converting it into an array in your script. -->

<!-- Here's an example: -->

```html
<script>
  let object = {
    first: 'Alice',
    second: 'Bob',
    third: 'Charlie'
  };

  let entries = Object.entries(object); // Converts object into array
</script>

<ul>
  {#each entries as [key, value]}
    <li>{key}: {value}</li>
  {/each}
</ul>
```

<!-- In the above example, `Object.entries(object)` is used to convert the object into an array of arrays, where each sub-array represents a key-value pair. -->

<!-- The `each` block then iterates over this array, destructuring each sub-array into `key` and `value` within the loop, which are used to dynamically render list items. -->

---

<!-- The output will be: -->

```html
<ul>
  <li>first: Alice</li>
  <li>second: Bob</li>
  <li>third: Charlie</li>
</ul>
```

<!-- Take note that the order in which properties appear in the iteration when using `Object.entries()` does not correspond to the original order they appeared in the object as object properties do not have a guaranteed order. This can cause problems if you're relying on data being displayed in a specific order. If you need to maintain order, you may have to find another way to enumerate over your data, such as using a `Map` or an array. -->
