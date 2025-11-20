---
marp: true
class: invert
footer: 'Stores'
headingDivider: 4
math: katex
paginate: true
style: |
  section::after {
    font-size: 16px;
  }
theme: default
---

<style>
  pre {
    line-height: 1.5;
  }
  section.smaller h3 {
    color: #fafafa;
    font-size: 36px;
    height: 100vh;
    display: flex;
    align-items: flex-end;
  }
  section.center-title h1 {
    color: #fafafa;
    text-align: center;
  }
</style>


- [IDM364: Stores](#idm364-stores)
- [Lesson Objectives](#lesson-objectives)
- [Defining Svelte context](#defining-svelte-context)
  - [Prop drilling](#prop-drilling)
  - [Prop drilling alternative - Svelte context](#prop-drilling-alternative---svelte-context)
- [Svelte Stores](#svelte-stores)
  - [`readable()`](#readable)
  - [`writable()`](#writable)
  - [`derived()`](#derived)
  - [Setup a `stores.js` library](#setup-a-storesjs-library)
  - [`update` vs `set`](#update-vs-set)
- [Auto-subscriptions](#auto-subscriptions)
- [Derived Stores](#derived-stores)
- [Custom Stores](#custom-stores)
- [Store Bindings](#store-bindings)


# IDM364: Stores

# Lesson Objectives

* Discuss Writable Stores
* Discuss Auto-subscriptions
* Discuss Readable Stores
* Discuss Derived Stores
* Introduce Custom Stores
* Review Store Bindings

# Defining Svelte context

<!-- When you need to pass data from a parent component to a child component, the first thing you should think of is using props: -->

```html
<Component props={value} />
```

<!-- What if you need to pass data from a parent component to a grandchild component? You could pass data as props from the parent component to the child component, and then from the child component to the grandchild component: -->

```html
<!-- Parent.svelte -->
<Child props={value} />

<!-- Child.svelte -->
<script>
  export let props;
</script>

<GrandChild props={props} />
```

## Prop drilling

<!-- This approach is called prop drilling. It is akin to drilling a hole through layers of components via props. This is frowned upon in most cases due to the following reasons: -->

- It's hard to trace where data comes from
- It's hard to trace where data leads to
- It's hard to restructure the component hierarchy

<!-- Whenever you want to trace where the data comes from in the child component, you may endlessly trace up through layers of the parent component, jumping through different Svelte component files. This slows you down and makes it harder to reason with the data flow. -->

<!-- The data that’s passed down through props into the child component is not to be used by the child component directly, but to be passed through it to its child component. You would have to step through the layer of components to find out where the data is finally being used. You may lose sight of where the data goes and have less confidence in making changes to the data that’s passed down. -->

<!-- When you add a new component in between the layers, you need to make sure to still pass the props through the new component from its parent to its children. When you move the components around, you need to make sure the child component still gets the props it needs by checking the chain of parent components. -->

## Prop drilling alternative - Svelte context

<!-- Svelte context is a method that provides data to all child components, no matter how many levels down the component tree they are. -->


<!-- A component tree is like a family tree for components. You have a parent component at the top, and one level down its child components, and one more level down is the child components of the child components: -->

![inline fill](https://res.cloudinary.com/pjs-uxid/image/upload/v1703795685/interactive_app_design_iv/svelte-context.jpg)

<!-- The top right node represents where `setContext` is called, and all shaded nodes under that node can access the context value using `getContext`. -->

---

<!-- To set a context value in a component, you can use `setContext()`: -->

```html
<script>
  import { setContext } from 'svelte';
  setContext("key", value);
</script>
```

<!-- All its child components and child components’ child components will be able to read the context value through `getContext()`: -->

```html
<script>
  import { getContext } from 'svelte';
  const value = getContext("key");
</script>
```

<!-- Svelte Context is especially useful for passing data down a component hierarchy without including props all the way down. It's great for sharing a small amount of data between a parent component and its direct descendants. However, context does not go beyond the parent/child relationship. For example, using context, a child component cannot directly update the state of its parent. -->

# Svelte Stores

<!-- A Svelte store is beneficial when you need to share mutable data across multiple components, or even across unrelated components or sibling components. It provides a single source of truth for state throughout the application and allows bidirectional data flow, meaning any component can alter the store's state and reflect the changes across all components subscribed to that store. Stores are more versatile than context and are central to state management in larger Svelte applications. -->

<!-- In simpler terms, use context to share data between parents and their direct children. In contrast, for broader state management, especially in larger applications, use Svelte stores. -->

<!-- Context Svelte provides a sub-package that exports a few built-in functions for Svelte stores. You can import them from the `svelte/store` package. Let's look at the built-in Svelte store functions. -->

## `readable()`

<!-- `readable()` helps create a readable Svelte store. Since the set method in a Svelte contract is optional, a readable store is a store that does not implement the `set` method. -->

<!-- To update the store value, the `readable()` function takes in a callback function that will be called when the store is being subscribed, and the callback function is called with a `set` function that can be used to update the store value: -->

```javascript
const store = readable(initialValue, (set) => {
  // update store value
  set(newValue);
});
```

---

```javascript
import { readable } from 'svelte/store';

const time_store = readable(Date.now(), function start(set) {
  const interval = setInterval(() => {
      set(Date.now());
  }, 1000);

  return function stop() {
      clearInterval(interval);
  };
});
```

---

<!-- `readable()` creates a store that is read-only from the component's perspective. Its value is not meant to be modified by the components directly. It is typically used when the store data is updated from an external source and components need to respond to these updates. For example, when you're fetching data from an API. -->

```html
<script>
  import { time_store } from './stores';
</script>

<p>Current time: {$time_store.toLocaleTimeString()}</p>
```

<!-- In this script, we define a readable store `time_store`. The start function sets up an interval that updates the store's value every second. When the component using the store is destroyed, the interval is cleared, thereby cleaning up the effect. -->

<!-- We use auto-subscription (`{$time_store}`) to reactively display the current time in the DOM. -->

<!-- Readable stores are handy when the value is derived or fetched from some data source and does not need to be directly updated by the component. They provide a robust, clean way to encapsulate data-producing logic, and they integrate seamlessly with Svelte's reactivity and component lifecycles. -->

## `writable()`

<!-- `writable()` helps create a writable Svelte store. This is similar to the readable store, except it implements the `set` method: -->

```javascript
const store = writable(initialValue);
store.set(newValue);
```

---

```javascript
// store.js
import { writable } from 'svelte/store';

export const count = writable(0);
```

---

```html
<!-- MyComponent.svelte -->
<script>
  import { count } from './store.js';

  function increment() {
    $count += 1;
  }
</script>

<button on:click={increment}>
  Click to increment count
</button>

<p>Count: {$count}</p>
```

<!-- `writable()` creates a store that is both read and write capable. Its value can be updated by components. This is used when the store needs to respond to user interactions within components. The `$` sign before count is used to access the value of a Svelte store. -->

## `derived()`

<!-- `derived()` creates a new Svelte store, deriving from existing stores. More information about derived stores later in this document. -->

## Setup a `stores.js` library

<!-- It's common to define store variables in a utility file so they can be imported and updated throughout your application. -->

```javascript
// stores.js
import { writable } from 'svelte/store';

export const count = writable(0);
```

<!-- In this example, we import the `writable` library, establish a variable named `count` as a writable store variable with an initial value of zero. Note the variable is exported from the `stores.js` file. -->

<!-- Now we can import the variable and access it's value anywhere in our application without worrying about passing it as a prop. -->

---

```html
<!-- App.svelte -->
<script>
  import { count } from './stores.js';

  let count_value;

  count.subscribe((value) => {
    count_value = value;
  });
</script>

<h1>The count is {count_value}</h1>
```

<!-- With this method, we import `count`, and then use Svelte's `subscribe` method to assign the value of `count` to a new local variable `count_value`, we we can then reference throughout our component. -->

---

<!-- Since `count` is writable, we can also use the `update` method to update it's value. -->

```html
<!-- Incrementer.svelte -->
<script>
  import { count } from './stores.js';

  function increment() {
    count.update((n) => n + 1);
  }
</script>

<button on:click="{increment}">+</button>
```

<!-- In this example, our button calls the `increment` function, which then updates the value of our `count` variable. -->

---

<!-- We also have access to the `set` method, which changes the value of a store variable to a new value that's provided. -->

```html
<!-- Resetter.svelte -->
<script>
  import { count } from './stores.js';

  function reset() {
    count.set(0);
  }
</script>

<button on:click="{reset}">reset</button>
```

## `update` vs `set`

| `update` | `set` |
| ------- | ----- |
| current state determines new state | replaces the value regardless of current value |

```javascript
count.set(5);

count.update((value) => value + 1);
```

# Auto-subscriptions

<!-- Svelte offers a concise way to use and react to store values in components, referred to as auto-subscriptions. Instead of manually subscribing and unsubscribing to a store, you can use the `$` syntax in front of the store name. -->

---

<!-- Here's an example: -->

```html
<script>
  import { writable } from 'svelte/store';

  let count_store = writable(0);

  function increment() {
    count_store.update((value) => value + 1);
  }
</script>

<button on:click="{increment}">Increment</button>

<p>Count: {$count_store}</p>
```

<!-- In this code, `$count_store` is auto-subscribing to the `count_store`. Anytime the store's value changes, Svelte will re-render this part of the component to reflect the new value. -->

<!-- Auto-subscription allows you to treat the store like a normal variable in your markup. Svelte takes care of subscriptions and unsubscriptions behind the scenes. The concise `$` syntax results in cleaner, easier-to-read code, which makes large and complex Svelte applications easier to maintain and understand. -->

---

<!-- Let's look at our previous example that uses the store library file. -->

```javascript
import { writable } from 'svelte/store';

export const count = writable(0);
```

---

<!-- Our `App` component previously looked like this: -->

```html
<!-- App.svelte -->
<script>
  import { count } from './stores.js';

  let count_value;

  count.subscribe((value) => {
    count_value = value;
  });
</script>

<h1>The count is {count_value}</h1>
```

<!-- Note the use of the `subscribe` method that assigns the store value to a local variable. -->

---

<!-- Using auto-subscriptions, we can reference the `count` variable directly, without the need of the `subscribe` method. -->

```html
<!-- App.svelte -->
<script>
  import { count } from './stores.js';
</script>

<h1>The count is {$count}</h1>
```

<!-- Any name beginning with `$` is assumed to refer to a store value. It's effectively a reserved character — Svelte will prevent you from declaring your own variables with a `$` prefix. -->

# Derived Stores

<!-- A derived store is a reactive store in Svelte that calculates its value based on one or more other store values. It automatically updates its value whenever any of the stores it depends on change. -->

<!-- You create a derived store by using the `derived` function from `svelte/store`. It takes at least two arguments: the stores to derive from, and a function that calculates the new value. -->

---

<!-- Here is an example of a derived store, which derives its value from two writable stores: -->

```html
<script>
  import { writable, derived } from 'svelte/store';

  let count1_store = writable(0);
  let count2_store = writable(0);

  function increment(count_store) {
    count_store.update(value => value + 1);
  }

  let total_count_store = derived(
    [count1_store, count2_store],
    ([$count1, $count2]) => $count1 + $count2
  );
</script>

<button on:click={() => increment(count1_store)}>Increment count 1</button>
<button on:click={() => increment(count2_store)}>Increment count 2</button>

<p>Count 1: {$count1_store}, Count 2: {$count2_store}, Total count: {$total_count_store}</p>
```

<!-- In this script, we have two writable stores `count1_store` and `count2_store`. We create a derived store called `total_count_store` that sums the values of `count1_store` and `count2_store`. -->

<!-- The derived store will automatically update its value anytime `count1_store` or `count2_store` changes. Using auto-subscriptions (`{$total_count_store}`), we display the total count in the DOM. -->

<!-- Derived stores provide a powerful way to manage complex relationships between pieces of state in your Svelte application. They allow you to keep your state normalized and avoid redundant or inconsistent data. -->

---

<!-- Let's look at another example based on our `time_count` store variable. -->

```javascript
// stores.js
import { readable } from 'svelte/store';

export const time_store = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});

const start = new Date();

export const elapsed = derived(time_store, ($time_store) =>
  Math.round(($time_store - start) / 1000)
);
```

<!-- This imports the `readable` function from 'svelte/store'. This function is used to create readable stores (stores whose values can be read but not directly modified). -->

<!-- Here, `readable` function is used to create a readable store called `time_store`, which is also exported so that it can be used in other modules. The store's initial value is set to the current date and time (`new Date()`). -->

<!-- The `readable` function takes a second argument: a start function with an argument (in this case, named `set`). If the start function is supplied, it will be called when the first subscriber adds themselves (here, via the `setInterval` function). This set function is normally used to update the store's value. -->

<!-- In this start function, a new interval is created that updates the store's value every second (`set(new Date())`) to the current date and time (`new Date()`). This automatically updates the `time_store` value every second with the latest timestamp. -->

<!-- This line just creates a new Date object, which represents the current date-time, and assigns it to the `start` constant. -->

<!-- The `elapsed` store is defined and exported using the `derived` function from 'svelte/store' (please import it at the beginning). This function creates a derived store, a store whose value is based on other stores. -->

<!-- The `derived` function is called with `time_store` and a function. It takes the resulting date of `time_store` (`$time_store`), subtracts the `start` date, and divides by 1000 to get the elapsed time in seconds. This time is then rounded using `Math.round()`. The value of `elapsed` will automatically update whenever `time_store` updates. -->

---

<!-- So, when the `elapsed` store value is read somewhere (e.g., via `$elapsed`), it always gives the number of seconds that have elapsed since the start of this script execution. It will automatically update every second. -->

```html
<script>
  import { time_store, elapsed } from './stores.js';
</script>

<h1>The time is {$time_store}</h1>

<p>
  This page has been open for {$elapsed} {$elapsed === 1 ? 'second' : 'seconds'}
</p>
```

# Custom Stores

<!-- In Svelte, you are not limited to just the writable, readable, and derived stores. You can also create your own custom stores with customized behaviors, methods, and properties. -->

<!-- A custom store can be created by defining an object with a `subscribe` method and possibly other additional methods and properties. The `subscribe` method must return an `unsubscribe` function to clear up any subscriptions. -->

---

<!-- Here is an example of a custom store: -->

```javascript
import { writable } from 'svelte/store';

function create_count() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
  };
}

export const count = create_count();
```

<!-- `function create_count() {...}`: Defining a function where a custom store will be created and returned. -->

<!-- `const { subscribe, set, update } = writable(0);`: Here, we use `writable` to create a simple writable store. As arguments, `writable` takes the initial state of the store, here it's `0`. The `writable` function returns an object that contains `set`, `update`, and `subscribe` functions. Here, these returned functions are destructured for easier usage. -->

<!-- `subscribe`: Allows components to subscribe to changes in the store's value. -->

<!-- `set`: Sets the store's value. -->

<!-- `update`: Applies a function to the store's value, updating it with the result. -->

<!-- `return {...}`: The function concludes by returning an object that exposes `subscribe` function, and custom `increment`, `decrement`, and `reset` methods. -->

<!-- `increment: () => update((n) => n + 1)`: It's a method that increases the value of the store by 1 using `update`. -->

<!-- `decrement: () => update((n) => n - 1)`: It's a method that decreases the value of the store by 1 using `update`. -->

<!-- `reset: () => set(0)`: A method that will reset the store value to `0` using `set`. -->

<!-- `export const count = create_count();`: The function `create_count` is invoked and the returned object (containing our store with additional methods) is exported as `count`. This means that the `count` store is available to import and use in other components. -->

---

<!-- In this code, a custom store named `count` is being created which exposes methods to increment, decrement, and reset the count in addition to subscribing to count changes. The initial count value is `0`, and this value can be interactively managed using the defined custom methods. -->

```html
<script>
  import { count } from './stores.js';
</script>

<h1>The count is {$count}</h1>

<button on:click="{count.increment}">+</button>
<button on:click="{count.decrement}">-</button>
<button on:click="{count.reset}">reset</button>
```

# Store Bindings

<!-- Besides subscribing to a store in a Svelte component, you can also bind to it directly in your markup. This is called store binding. -->

<!-- To bind to a writable (or custom) store, you use a regular bind syntax in Svelte, but you put the store variable instead of a component prop or an element attribute. -->

<!-- When a user updates a form element that is bound to a store, the change immediately updates the store’s value. -->

---

<!-- Here is an example where we bind an input field to a writable store: -->

```html
<script>
  import { writable } from 'svelte/store';

  let name_store = writable('Anonymous');
</script>

<input bind:value="{$name_store}" placeholder="Enter your name" />

<p>Hello, {$name_store}!</p>
```

<!-- In this script, we bind an `<input>` to `name_store` using `bind:value={$name_store}`. As a user types in this input, the value of `name_store` is updated, and that update is reflectively shown in the `<p>` element. -->

<!-- Store bindings can only be used with writable stores or custom stores with specific set methods because they rely on being able to set the store's value based on user input. -->

<!-- Store bindings provide a simple, declarative way to link your UI with a certain state in your application. They make form handling extremely straightforward. -->
