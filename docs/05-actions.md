---
marp: true
class: invert
footer: 'Actions'
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


- [IDM364: Actions](#idm364-actions)
- [Lesson Objectives](#lesson-objectives)
- [Define actions](#define-actions)
  - [Reusing DOM event logic with custom events](#reusing-dom-event-logic-with-custom-events)
- [Encapsulate logic into an action](#encapsulate-logic-into-an-action)
- [Pass parameters to an action](#pass-parameters-to-an-action)

# IDM364: Actions

<!-- Actions are one of the most powerful features of Svelte. They are a lightweight alternative to a component that encapsulates logic and data into a reusable unit. They help us reuse the same logic on different elements. -->

# Lesson Objectives

* Define actions
* Encapsulate logic into an action
* Pass parameters to an action

# Define actions

<!-- Before we start to talk about using Svelte actions to create custom events, let’s define an action in Svelte. In Svelte, an action is nothing but a function that follows an action contract. This means if a function follows a specific function signature, it is considered an action. Here is the function signature of an action: -->

```javascript
function action(node) {
  return {
    destroy() {}
  };
}
```

<!-- It is a function that optionally returns an object that has a destroy method. -->

<!-- In this case, since the action function follows the action contract, it is a Svelte action. To use the Svelte action on an element, you can use the `use:` directive: -->

```html
<div use:action />
```

## Reusing DOM event logic with custom events

<!-- Let's look at an example of using the `mousedown` and `mouseup` events to create a long-press behavior. We'll see how this example will lead us on to Svelte actions. -->

```html
<script>
  let timer;
  function handle_mousedown() {
    timer = setTimeout(() => {
      console.log('long press!');
}, 2000); }
  function handle_mouseup() {
    clearTimeout(timer);
  }
</script>
<button
  on:mousedown={handle_mousedown}
  on:mouseup={handle_mouseup}
/>
```

<!-- The idea is to press and hold the button for more than two seconds and then perform some action. As we detect it’s a long press, we print `'long press!'` into the console. -->

<!-- To implement the long-press behavior, I attached two event listeners: `mousedown` and `mouseup`. The two event listeners work together. mousedown starts counting down using setTimeout for two seconds, and mouseup clears the countdown using clearTimeout. If the user did not hold onto the button for long enough, the timeout would not be triggered and it would not be considered a long press. -->

<!-- Note that to coordinate the timers between the two event listeners, the `timer` variable is shared across the event listeners. As you can see, to implement a long-press behavior, you will need two event listeners and one shared variable. Now, what if you need to have this long-press behavior on another button? -->

# Encapsulate logic into an action

<!-- A way to recreate a different long-press button is to encapsulate it as a component, putting all the long-press button logic into a component and reusing the component as a means to reuse the logic. -->

<!-- When you define a component, you define the logic as well as the elements in the component. This means that if we put both the long-press logic and the button element into the component, we have to use the long-press logic together with the button element and no other elements. -->

---

<!-- If you want to customize the element, maybe by using a different element, having a different style, showing a different text content, or adding more event listeners, you would have to define the styles, text contents, or event listeners as props of the component and pass them into the button element in the component: -->

```html
<!-- LongPressButton.svelte -->
<!--
  besides the longpress behavior
  you need to pass down props as attributes {...$$props}
  and also forward events up
 -->
<button
  on:mousedown={handle_mousedown}
  on:mouseup={handle_mouseup}
  on:click
  on:dblclick
>
<slot />
</button>
```

<!-- If you wish to reuse event listener logic via components, you will find yourself having to take care of other attributes that go along with the element in the component. -->

---

<!-- A better option is to use an action to encapsulate the long-press behavior. -->

```javascript
function long_press(node) {
  let timer;

  function handle_mousedown() {
    timer = setTimeout(() => {
      console.log('long press!');
  }, 2000); }

  function handle_mouseup() {
    clearTimeout(timer);
  }

  node.addEventListener('mousedown', handle_mousedown);
  node.addEventListener('mouseup', handle_mouseup);

  return {
    destroy() {
     node.removeEventListener('mousedown', handle_mousedown);
     node.removeEventListener('mouseup', handle_mouseup);
    }
  }
}
```

<!-- Why is this method better? With the action defined (as shown in the preceding code), we can use the action over multiple elements: -->

---

```html
<button use:long_press>Button one</button>
<button use:long_press>Button two</button>
<span use:long_press>Hold on to me</span>
<button use:long_press class="..." on:click={...} />
```

<!-- You can apply the action to a different type of element. You can also use it alongside other attributes or event listeners. Actions are a great tool for abstracting out element-level logic. -->

# Pass parameters to an action

<!-- There is still one missing piece of the puzzle: how should we add a different long-press handler for a different element? -->

---

<!-- We can customize the behavior of an action by passing parameters into the action. For example, if we want to have a different function to handle a long-press action on different `button` elements, we can pass a different function into the action through action parameters: -->

```html
<button use:long_press={doSomething1} />
<button use:long_press={doSomething2} />
```

<!-- We will then receive this function within the second argument of the action function: -->

```javascript
function long_press(node, fn) {
  // ...
}
```

---

<!-- In Svelte actions, you can only pass in one parameter. To pass in multiple parameters, you will have to turn them into an object and pass them in as one parameter. -->

```html
<button use:long_press={{
  on_long_press: doSomething1,
  duration: 5000
}}>
```

---

<!-- Some of the parameters in the object could be optional, so we might need to provide a default value when reading them within the action: -->

```javascript
function long_press(node, { on_long_press, duration = 1000 }) {
  // if not specified, the default duration is 1s
}
```
