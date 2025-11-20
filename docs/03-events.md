---
marp: true
class: invert
footer: 'Events'
headingDivider: 4
math: katex
paginate: true
style: |
  section::after {
    font-size: 16px;
  }
---

- [IDM364: Events](#idm364-events)
- [Lesson Objectives](#lesson-objectives)
- [DOM Events](#dom-events)
  - [Handling a click event](#handling-a-click-event)
  - [Working with event details](#working-with-event-details)
  - [Passing parameters to event handlers](#passing-parameters-to-event-handlers)
- [Inline Event Handlers](#inline-event-handlers)
- [Event Modifiers](#event-modifiers)
  - [preventDefault](#preventdefault)
  - [stopPropagation](#stoppropagation)
  - [self](#self)
  - [once](#once)
- [Component Events](#component-events)
- [Event Forwarding](#event-forwarding)
- [DOM Event Forwarding](#dom-event-forwarding)

# IDM364: Events

# Lesson Objectives

* Discuss DOM Event
* Discuss Inline Event Handlers
* Discuss Event Modifiers
* Introduce Component Events
* Discuss Event Forwarding
* Discuss DOM Event Forwarding

# DOM Events

<!-- Svelte allows you to easily add event listeners to DOM elements with the `oneventname` directive. This is useful for handling user interactions like clicks, mouse movement, keyboard input, form handling, and so on. -->

<!-- Let's understand the concept with examples: -->

## Handling a click event

```html
<script>
  let count = 0;

  function handle_click() {
    count += 1;
  }
</script>

<button onclick={handle_click}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

<!-- Here, we add a `click` event to a button. When the button is clicked, the `handle_click` function is executed, incrementing the `count`. -->

## Working with event details

<!-- Event handlers receive an `event` object as a parameter. This object contains information about the event. -->

```html
<script>
  function handle_mouse_move(event) {
    console.log(`Mouse move: ${event.clientX}, ${event.clientY}`);
  }
</script>

<div
  onmousemove={handle_mouse_move}
  style="height: 200px; background: lightgray;">
  Move your mouse over me.
</div>
```

<!-- In the above example, `handle_mouse_move` logs the mouse coordinates. `event.clientX` and `event.clientY` give the mouse pointer's horizontal and vertical coordinates respectively. -->

## Passing parameters to event handlers

<!-- You can also pass additional parameters to the event handlers. -->

```html
<script>
  let count = 0;

  function increment(step, event) {
    count += step;
  }
</script>

<button onclick={(event) => increment(2, event)}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

<!-- Here, `increment` receives a `step` parameter, which specifies by how much `count` should be increased. This is achieved by passing an arrow function to `onclick`, which then calls `increment` with the specified step and event. -->


<!-- These examples represent a basic overview of handling DOM events in Svelte. Svelte also offers advanced event handling options like event modifiers, forwarding events, and more, which we'll cover in the following topics. DOM events in Svelte provide an intuitive and declarative way to handle user interactions and manage the state of your application. -->

# Inline Event Handlers

<!-- In Svelte, it's possible to create event handlers inline, right at the point where you're attaching the event listener in your markup. This is handy for simple event handling logic that doesn't necessitate a separate function. -->

<!-- Inline event handlers are created using JavaScript expressions inside the event directive (`oneventname`). -->


<!-- Here's an example: -->

```html
<script>
  let text = '';
</script>

<input
  type='text'
  bind:value={text}
  oninput={() => console.log(text)} />
```

<!-- In this example, we create an inline handler for the `input` event. Whenever the input field's content changes, the inline function logs the current field content. -->

---

<!-- Inline handlers also have access to the event object. Here's an example where `event.target.value.length` is logged each time the user types in the text field. -->

```html
<script>
  let text = '';
</script>

<input
  type='text'
  bind:value={text}
  onn input={(event) =>
    console.log(`Input length: ${event.target.value.length}`)}
/>
```

<!-- Although inline handlers offer a convenient way to handle simple event listeners, remember for more complex logic, it's better to move the handling functionality into component methods (`<script>` block) to keep your markup clean and readable. -->

<!-- It's also worth noting that if the inline handler includes a complex computation or changes many reactive variables, then a separate function handler would be more performant, as Svelte optimizes reactive updates better in the component script. -->

<!-- Still, inline handlers can be an excellent tool for quickly attaching uncomplicated event logic directly in your markup, which can be beneficial for prototyping, debugging, and simple use cases. -->

# Component Events

<!-- Along with inheriting all the familiar DOM events, Svelte components can emit their own custom events. This ability is useful for child-to-parent communication in your application hierarchy. -->

<!-- In Svelte, custom events are created in child components with the `dispatch` function (grabbed from `createEventDispatcher()`) and consumed in parent components with the `oneventname` directive. -->

---

<!-- Let's consider an example. Suppose you have a `Button.svelte` component that emits a `click` event when it is clicked: -->

```html
<!-- Button.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handle_click() {
    dispatch('click');
  }
</script>

<button onclick={handle_click}>
  Click me
</button>
```

<!-- Here, `createEventDispatcher` initializes a `dispatch` function, which can send custom events. When the button is clicked, the `handle_click` function emits a `click` event. -->

---

<!-- Now, in a parent component, you can respond to the custom `click` event like this: -->

```html
<!-- Parent.svelte -->
<script>
  import Button from './Button.svelte';

  function handle_button_click() {
    alert('Button was clicked!');
  }
</script>

<Button onclick={handle_button_click} />
```

<!-- In the parent component, `onclick` listens to the `click` event emitted by the `Button` component. When the button is clicked, the `handle_button_click` function is called, and an alert appears. -->

---

<!-- Svelte also enables passing data to custom events. Let's modify `Button.svelte` to send a message along with the `click` event: -->

```html
<!-- Button.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handle_click() {
    const message = 'Hello from Button';
    dispatch('click', message);
  }
</script>

<button onclick={handle_click}>
  Click me
</button>
```

---

<!-- Now, in `Parent.svelte`, we can access this message: -->

```html
<!-- Parent.svelte -->
<script>
  import Button from './Button.svelte';

  function handle_button_click(event) {
    alert(event.detail); // Alerts "Hello from Button"
  }
</script>

<Button onclick={handle_button_click} />
```

<!-- With `event.detail`, we can access the data sent along with the dispatched event. -->

<!-- Component events in Svelte offer an intuitive, flexible way for child components to communicate upwards with parent components, facilitating complex information sharing and interaction between components. -->

# Event Forwarding

<!-- Event forwarding is a feature in Svelte that allows components to forward events to their parent components without handling them first. This is useful in scenarios where a child component doesn't need to do anything special with an event and can simply pass it along to its parent. -->

<!-- Svelte syntax allows for a very compact, readable form of event forwarding using the `oneventname` directive without the assignment (`=`) or the handler. -->

<!-- Here's an example scenario – suppose we have a `Button` component that we want to customize across different parts of our application, but the click event handling would be done in the parent component: -->

```html
<!-- Button.svelte -->
<script>
  let { text, onclick } = $props();
</script>

<!-- <button onclick={onclick}> -->
<button {onclick}>
  {text}
</button>
```

<!-- In this example, `Button.svelte` is a reusable button component that accepts a `text` prop. Note the `onclick` directive without an assignment (`=`) – this means that `Button` component will forward any click events it receives to its parent. -->

---

<!-- An application using this component might look like: -->

```html
<!-- +page.svelte -->
<script>
  import Button from '$lib/Button.svelte';

  function show_alert() {
    alert('Button was clicked!');
  }
</script>

<Button onclick={show_alert} text="Click me" />
```

<!-- In the parent component `+page.svelte`, we handle the forwarded click event using `onclick={show_alert}`. -->

<!-- This feature reduces unnecessary boilerplate if child components do not need to handle events, creating cleaner and more readable code. Event forwarding allows you to create more generic, reusable components, and enhances a component's encapsulation by minimizing its responsibilities. -->

# DOM Event Forwarding

<!-- Just as Svelte allows component event forwarding, it also facilitates DOM event forwarding. Essentially, this means that a custom Svelte component can catch an event triggered by a DOM element within the component and forward it to the parent component. -->

<!-- In Svelte, any DOM event can be forwarded from the component to the parent using the regular Svelte event binding syntax `oneventname`. -->

<!-- To illustrate this, we can use an example of a custom `Input` component. Within the component, we'll have an `input` HTML element. We want to notify the parent component when this `input` field changes: -->

```html
<!-- Input.svelte -->
<script lang="js">
	let { value, oninput } = $props();
</script>

<!-- <input type="text" bind:value oninput={oninput} /> -->
<input type="text" bind:value {oninput} />
```

<!-- Here we bind the `value` to the `input` field, and we've set `oninput` without an event handler. This is the syntax to forward this DOM event to the parent component. -->

---

<!-- Now in the parent component, we can handle the forwarded `Input` event: -->

```html
<!-- +page.svelte -->
<script>
  import Input from '$lib/Input.svelte';

  let value = '';

  function handle_input_change(event) {
    console.log('Input changed to:', event.target.value);
  }
</script>

<!-- <Input bind:value={value} oninput={handle_input_change} /> -->
<Input bind:value oninput={handle_input_change} />
```

<!-- Here in `+page.svelte`, we're importing and using our `Input` component. Using `oninput`, we listen to the `input` event forwarded from the `Input` component, and display the new value in the console whenever the user changes the input field. -->

<!-- With DOM event forwarding, Svelte enables you to handle DOM events directly in parent components, which can simplify the architecture of your application and create components that are more reusable and easier to understand. It allows the child component to focus on its internal state and presentation, while the parent component can manage what happens due to those interactions. -->
