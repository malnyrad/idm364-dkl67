---
marp: true
class: invert
footer: 'Reactivity and Props'
headingDivider: 4
math: katex
paginate: true
style: |
  section::after {
    font-size: 16px;
  }
---

- [IDM364: Reactivity, Props, \& Bindings](#idm364-reactivity-props--bindings)
- [Lesson Objectives](#lesson-objectives)
- [Reactivity](#reactivity)
  - [Svelte 5 Reactivity with Runes](#svelte-5-reactivity-with-runes)
  - [Key Differences](#key-differences)
- [Props](#props)
    - [Destructure React props](#destructure-react-props)
  - [Svelte 4 Props](#svelte-4-props)
    - [Parent Components](#parent-components)
    - [Default Values](#default-values)
    - [Spread Props](#spread-props)
- [Advanced Props in Svelte 5](#advanced-props-in-svelte-5)
  - [Basic Props Usage](#basic-props-usage)
  - [Props with Fallback Values](#props-with-fallback-values)
  - [Props Renaming](#props-renaming)
  - [Rest Props Pattern](#rest-props-pattern)
- [Defining state](#defining-state)
  - [React component state](#react-component-state)
  - [Svelte 4 component state](#svelte-4-component-state)
    - [Svelte 5 runes](#svelte-5-runes)
  - [Props and State Management](#props-and-state-management)
    - [Example 1: Basic State Updates](#example-1-basic-state-updates)
    - [Example 2: Object Props](#example-2-object-props)
  - [Best Practices for Prop Mutations](#best-practices-for-prop-mutations)
  - [Common Patterns](#common-patterns)
    - [Pattern 1: Props with Callbacks](#pattern-1-props-with-callbacks)
    - [Pattern 2: Bindable Props](#pattern-2-bindable-props)
  - [Summary and Best Practices](#summary-and-best-practices)
- [Assignments using Svelte Bindings](#assignments-using-svelte-bindings)
  - [Form Element Bindings](#form-element-bindings)
  - [Element References](#element-references)
  - [Key Binding Concepts in Svelte 5](#key-binding-concepts-in-svelte-5)

# IDM364: Reactivity, Props, & Bindings

# Lesson Objectives

* Discuss Svelte Reactivity
* Discuss Svelte Component Props
* Discuss Assignments using Svelte Bindings

# Reactivity

<!-- Svelte has a unique approach to reactivity. Variables and statements declared in the script tag of a Svelte component react automatically to changes. This is achieved with the assignment operator (`=`), which tells Svelte to listen for changes in the variables used on the right side of the assignment. -->

<!-- Let's take a simple example: -->

```html
<script>
  let count = 1
  let double_count = count * 2
</script>

<p>The count is {count}, the double count is {double_count}</p>
<button onclick={() => count++}>Increment Count</button>
```

<!-- Notice `double_count` doesn't update when `count` changes. This is where reactive statements come in by using the `$:` label. -->

## Svelte 5 Reactivity with Runes

```html
<script>
  let count = $state(1)
  let double_count = $derived(count * 2)

  $effect(() => {
    if (count >= 10) {
      console.log('Count is 10 or more')
    }
  })
</script>

<button onclick={() => count++}>Count: {count}</button>
<p>Double: {double_count}</p>
```

<!-- Let's break down this example of Svelte 5's new reactivity system using runes. This is a significant change from Svelte 4, so pay close attention. -->

---

<!-- First, we're creating a reactive state variable called 'count' using the new `$state` rune: -->

```javascript
let count = $state(1)
```

<!-- Think of `$state` as a way to tell Svelte 'hey, this variable needs to be watched for changes.' It's starting with a value of 1, and whenever this value changes, Svelte needs to update anything that depends on it. -->

---

<!-- Next, we have this line: -->

```javascript
let double_count = $derived(count * 2)
```

<!-- The `$derived` rune is replacing what we used to do with $: in Svelte 4. It's telling Svelte 'this value depends on other reactive values.' Whenever count changes, double_count will automatically be recalculated. If count becomes 2, double_count becomes 4, and so on. -->

---

<!-- Then we have an effect: -->

```javascript
$effect(() => {
  if (count >= 10) {
    console.log('Count is 10 or more')
  }
})
```

<!-- The `$effect` rune is like setting up a watchdog. It's saying 'run this code block any time the reactive values inside it change.' In this case, every time count changes, Svelte checks if it's 10 or more, and if it is, logs a message to the console. -->

---

<!-- Finally, in our template, we have: -->

```html
<button onclick={() => count++}>Count: {count}</button>
<p>Double: {double_count}</p>
```

<!-- This creates a button that increments count when clicked, and displays both count and double_count. Thanks to our runes setup, every time you click the button: -->

<!-- 1. count increases by 1
2. double_count automatically updates to twice the new value
3. the effect checks if count has reached 10 or more -->

<!-- The beauty of this system is how explicit it is. Unlike Svelte 4 where reactivity could sometimes feel a bit magical, in Svelte 5 we're clearly stating our intentions: this is state, this is derived from state, and this should happen when state changes. -->

## Key Differences

- `$state()` replaces regular `let` declarations for reactive variables
- `$derived()` replaces `$:` reactive declarations
- `$effect()` replaces reactive statement blocks
- More explicit and consistent syntax
- Works the same way in `.js`, `.ts` and `.svelte` files

# Props

## React Props

<!-- Recall how we deal with props in React. -->

```html
<!-- Parent.jsx -->
<Child name="Jane Smith" age={24} />
```

```javascript
// Child.jsx
function Child(props) {
  const { name, age } = props;

  return (
    <p>
      {name} is {age} years old!
    </p>
  );
}
```

### Destructure React props

```javascript
// Child.jsx
function Child({ name, age }) {
  return (
    <p>
      {name} is {age} years old!
    </p>
  );
}
```

# Svelte 5 Props

<!-- In Svelte 5, we use the `$props()` rune to declare props in a component. Here's a basic example: -->

```html
<!-- MyComponent.svelte -->
<script>
  let { adjective } = $props();
</script>

<p>this component is {adjective}</p>
```

To use this component:

```html
<MyComponent adjective="cool" />
```

## Props with Fallback Values

<!-- Svelte 5 allows you to declare fallback values for props that might not be provided by the parent: -->

```html
<!-- MyComponent.svelte -->
<script>
  let { adjective = 'happy' } = $props();
</script>

<p>this component is {adjective}</p>
```

<!-- Important: Fallback values are not turned into reactive state proxies. This means they won't trigger reactivity when modified. -->

## Props Renaming

<!-- Sometimes you need to rename props, especially when dealing with JavaScript keywords or to make the code more readable: -->

```html
<script>
  let { super: trooper = 'lights are gonna find me' } = $props();
</script>
```

<!-- This renames the incoming prop `super` to `trooper` in your component, with a fallback value. -->

## Rest Props Pattern

<!-- You can collect remaining props using the rest pattern: -->

```html
<!-- MyComponent.svelte -->
<script>
  let { a, b ...others } = $props();

  console.log(JSON.stringify(others));
</script>
```

```html
<!-- +page.svelte -->
<MyComponent a="a" b="b" c="c" />
```

<!-- This is useful when you need to forward multiple unknown props to a child component. -->

# Defining state

<!-- Next, let’s look at the state. State is any data that is used and managed within a component. It is not passed in from a parent component like props. Instead, it is defined within the component itself. -->

<!-- Again, let's recall how we handle component state in React. -->

## React component state

```javascript
function MyComponent() {
  const [count, set_count] = useState(0);
}

return (
  <button onClick={() => set_count(count += 1)}>
)
```

## Svelte 5 runes

```js
<script>
let count = $state(0);

function increment() {
  count += 1;
}
</script>

<button onclick={increment}>
  clicks: {count}
</button>
```

<!-- At first glance, this might seem like a step back — perhaps even un-Svelte-like. Isn't it better if let count is reactive by default? -->

<!-- The Svelte dev team understands the reality is that as applications grow in complexity, figuring out which values are reactive and which aren't can get tricky. The rule or shortcut we're talking about only applies to 'let' declarations made at the start or 'top level' in a component. This could be confusing because code behaves differently in `.svelte` files compared to `.js` files. This might cause problems when you're rearranging or 'refactoring' your code, like when you need to create a 'store' to use a piece of data in multiple spots. -->

## Props and State Management

### Example 1: Basic State Updates

```html
<!-- +page.svelte -->
<script>
  import Child from './Child.svelte';
  let count = $state(0);
</script>

<button onclick={() => (count += 1)}>
  clicks: {count}
</button>

<Child {count} />
```

---

```html
<!-- Child.svelte -->
<script>
  let { count } = $props();
</script>

<button onclick={() => (count += 1)}>
  clicks: {count}
</button>
```

### Example 2: Object Props

<!-- When working with object props, there are important considerations: -->

```html
<!-- +page.svelte -->
<script>
  import Child from './Child.svelte';
  let my_object = { count: 0 };
</script>

<Child {my_object} />
```

---

```html
<!-- Child.svelte -->
<script>
  let { my_object } = $props();
</script>

<button onclick={() => {
  // This won't work as expected!
  my_object.count += 1
}}>
  clicks: {my_object.count}
</button>
```

<!-- This is something that trips up even experienced developers, so it's important to understand what's happening here. -->

---

<!-- In our parent component, App.svelte, we create a simple object: -->

```javascript
let object = { count: 0 };
```

<!-- This is just a regular JavaScript object with a count property set to 0. We're passing this down to a Child component using Svelte's shorthand prop syntax `{object}`, which is the same as writing `object={object}`. -->

---

<!-- Now, in our Child component, we receive this object using the new $props() rune: -->

```javascript
let { object } = $props();
```

<!-- This is Svelte 5's way of declaring props, replacing the old `export let` syntax from Svelte 4. -->

---

<!-- Here's where it gets interesting. In the Child component, we have a button that tries to increment the count: -->

```javascript
<button onclick={() => {
  object.count += 1  // This won't work as expected!
}}>
```

<!-- When we click this button... nothing happens! Well, the count does increment, but our UI doesn't update. Why? -->

<!-- This is because Svelte's reactivity system isn't tracking mutations to object properties in props. When we try to modify `object.count`, we're mutating the object directly, but Svelte doesn't know it needs to re-render the component. -->

<!-- Think of it like this: Svelte is watching the object reference itself, but not what's happening inside the object. It's like having a security camera pointed at a box - if someone moves the box, the camera sees it, but if someone opens the box and changes what's inside, the camera can't tell. -->

---

<!-- So how do we fix this? We have a few options: -->

1. Make the object reactive in the parent using $state:

```javascript
let my_object = $state({ count: 0 });
```

---

2. Use a callback prop to handle updates:

```javascript
// Parent
function increment() {
  my_object.count += 1;
}

// Child
let { my_object, onIncrement } = $props();
<button onclick={onIncrement}>
```

---

3. Use the `$bindable` rune if you really need two-way binding:

```javascript
// Parent
let my_object = $state({ count: 0 });
<Child bind:my_object />
```

<!-- The key takeaway here is that props in Svelte should generally flow downward, and we should avoid mutating them directly in child components. If you need to modify data, either manage the state in the parent component or use proper bindings. -->

### Full Example

```html
<!-- +page.svelte (Parent) -->
<script>
	import Child from '$lib/Child.svelte';
	let my_object = { count: 0 };

	// Define the increment function in the parent
	function handleIncrement() {
		my_object.count += 1;
	}
</script>

<Child {my_object} onIncrement={handleIncrement} />
```

---

```html
<!-- Child.svelte -->
<script>
	let { my_object, onIncrement } = $props();
</script>

<button onclick={onIncrement}>
	clicks: {my_object.count}
</button>
```

<!-- Here's how it works: -->

<!-- 1. In the parent component, we define a function `handleIncrement` that knows how to update our object
1. We pass this function down as a prop called `onIncrement` to the child
1. In the child, we destructure both object and `onIncrement` from our props
1. When the button is clicked, it calls the `onIncrement` function, which is actually running the `handleIncrement` function from the parent -->

<!-- This pattern is called "lifting state up" - instead of the child trying to modify the object directly, it tells the parent "hey, please increment this for me" by calling the function that was passed down. -->

## Best Practices for Prop Mutations

---

1. **Don't Mutate Props Directly**
   - Props should be treated as immutable
   - Use callback props to communicate changes back to parent

---

2. **Use $bindable When Needed**
   ```html
   <!-- Parent.svelte -->
   <script>
     let count = $state(0);
   </script>
   <Child bind:count />
   ```

---

3. **Handle Object Props Carefully**
   - If you need to modify object props, use `$state()` in the parent
   - Pass the state down as props
   - Use callbacks to handle updates

## Common Patterns

### Pattern 1: Props with Callbacks

```html
<!-- Parent.svelte -->
<script>
  let count = $state(0);
  function handleIncrement() {
    count += 1;
  }
</script>

<Child {count} onIncrement={handleIncrement} />
```

### Pattern 2: Bindable Props

```html
<!-- Parent.svelte -->
<script>
  let object = $state({ count: 0 });
</script>

<Child bind:object />
```

## Summary and Best Practices

1. Use `$props()` to declare props
2. Set fallback values for optional props
3. Don't mutate props unless they're explicitly bindable
4. Use callbacks to communicate changes up to parent components
5. When working with objects, manage state in the parent and pass down as props
6. Use the `$bindable` rune when two-way binding is necessary

<!-- Remember: The core principle is unidirectional data flow. Props should flow down, events should flow up, and mutations should be handled by the parent component. -->

# Assignments using Svelte Bindings

<!-- Svelte enables you to create two-way data bindings to DOM elements using the `bind:` directive. This means you can not only display the data from your JavaScript code onto the DOM, but also listen for changes in the DOM and keep it synchronized with your Svelte component's state. -->

```html
<script>
  let name = $state('');
</script>

<input bind:value={name} placeholder="Enter your name" />

<p>Hello, {name}!</p>
```

<!-- As demonstrated, bindings create a two-way data flow, enabling data changes to propagate from the element to the component state, and from the component state into the element. -->

---

<!-- You can use the bind: directive to link the props of a component with your component’s state, as shown in the following code: -->

```html
<script>
  import Profile from './Profile.svelte';
  let name = $state('John');
</script>

<Profile bind:username={name} />
```

<!-- We bind the username props of the `<Profile>` component to the name state variable. When you update the name state variable, the value of the username prop will automatically reflect the new value; conversely, if you update the value of the username prop from within the `<Profile>` component, the value of the name state variable will automatically update to match. -->

---

<!-- To further demonstrate this behavior, let’s make a slight modification to the code. Here’s the updated version of the component: -->

```html
<script>
  import Profile from './Profile.svelte';
  let name = $state('John');
</script>

<p>Name from App: {name}</p>
<Profile bind:username={name} />
<button onclick={() => name = "Svelte"}>Update from App</button>
```

<!-- In this code snippet, we’ve added a `<p>` element and a `<button>` element. The `<p>` element shows the value of the name state variable, and the `<button>` element, when clicked, updates the value of the name state variable to Svelte. Due to the binding, when the button is clicked, it will also update the username props in the `<Profile>` component. -->

---

<!-- Here’s the updated version of the `<Profile>` component: -->

```html
<!-- Profile.svelte -->
<script>
	let { username } = $props();
</script>

<p>Name in Profile: {username}</p>
<button onclick={() => (username = 'World')}>Update from Profile</button>
```

<!-- In this code snippet, we are looking at the `<Profile>` component. This component receives a prop called username, whose value is displayed inside a `<p>` element. We’ve also added a button, and when clicked, it will update the value of the username prop to `"World"`. -->

<!-- Because of the binding we established in the parent component, any change to the username prop in this `<Profile>` component will also update the name state variable in the parent component. -->

<!-- This is the power of two-way binding in Svelte, allowing you to easily synchronize data between parent and child components. -->

## Form Element Bindings

<!-- Text inputs, checkbox inputs, radios, and select dropdowns are among the form elements which we frequently interact with. Here are examples for each: -->

```html
<script>
  let name = $state('');
  let agreed = $state(false);
  let color = $state('');
  let choice = $state('');
</script>

<!-- Text Input -->
<input type="text" bind:value={name} />

<!-- Checkbox -->
<input type="checkbox" bind:checked={agreed} />

<!-- Radio Buttons -->
<input type="radio" bind:group={color} value="red" /> Red
<input type="radio" bind:group={color} value="green" /> Green

<!-- Select Dropdown -->
<select bind:value={choice}>
  <option value="">-- select --</option>
  <option value="one">One</option>
  <option value="two">Two</option>
</select>
```

## Element References

```html
<script>
  let my_div = $state(null);
</script>

<div bind:this={my_div}>Hello!</div>
<button onclick={() =>
  alert(`Div height: ${my_div.offsetHeight}px`)}>
  Get div height
</button>
```

<!-- This example will alert the height of the `div` element when the button is clicked. -->

<!-- Svelte's bindings are an important part of the framework's reactivity system, allowing for a seamless two-way data flow between component state and the DOM. They create an intuitive and declarative approach to manage user input and browser behavior, leading to a more maintainable and understandable code. -->

---

## Key Binding Concepts in Svelte 5

- Bindings work similarly across Svelte 4 and 5
- Use `$state()` for form-bound variables
- Two-way data flow remains the same
- Component props can be bound in both versions
- Element refs use `$state()` in Svelte 5
