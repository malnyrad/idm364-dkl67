---
marp: true
class: invert
footer: 'Components'
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

- [IDM364: Svelte Components](#idm364-svelte-components)
- [Lesson Objectives](#lesson-objectives)
- [Introduce Svelte Components](#introduce-svelte-components)
    - [HTML](#html)
    - [JavaScript](#javascript)
    - [HTML + JavaScript](#html--javascript)
- [Discuss Dynamic Attributes](#discuss-dynamic-attributes)
- [Discuss Nesting Components](#discuss-nesting-components)
  - [Child Components](#child-components)
  - [Naming Convention](#naming-convention)
  - [Project Directory Structure](#project-directory-structure)
  - [The `$lib` alias](#the-lib-alias)
    - [`$lib` Vite config](#lib-vite-config)
- [Special tags](#special-tags)
  - [`@html`](#html-1)
  - [`<svelte:window />`](#sveltewindow-)
  - [`<svelte:document />`](#sveltedocument-)
  - [`<svelte:body />`](#sveltebody-)
  - [`<svelte:head />`](#sveltehead-)

# IDM364: Svelte Components

# Lesson Objectives

* Introduce Svelte Components
* Discuss Dynamic Attributes
* Discuss Styling Components
* Discuss Nesting Components
* Review Svelte's Special Tags

# Introduce Svelte Components

<!-- Svelte applications are composed of components. A component in Svelte is a reusable self-contained block of code that encapsulates HTML, CSS, and JavaScript that control a part of the UI. You define components in files with the `.svelte` extension. -->

<!-- Let's break down the basic structure of a Svelte component: -->

### HTML

<!-- HTML in a Svelte component is written just like it would be in a regular `.html` file. -->

```html
<h1>Hello world</h1>
```

### JavaScript

<!-- JavaScript is added within `<script>` tags. -->

<!-- You can declare reactive variables within the script tags. A reactive variable is prefixed with `let` which allows the variable to be reassigned during the component's lifecycle. -->

<!-- Here is an example of declaring a reactive variable: -->

```html
<script lang="js">
  let name = 'world';
</script>
```

<!-- In this case, `name` is a reactive variable that's initially assigned the value 'world'. -->

### HTML + JavaScript

<!-- The `{}` (curly braces) in the HTML allow you to embed JavaScript expressions. For instance, suppose we have a reactive variable `name`. With traditional JavaScript, we have to do some work to display the value of the variable in the DOM: -->

```html
<h1>Hello <span id="name"></span></h1>
```

```javascript
const name_element = document.getElementById('name');
const name_text = ' world';
const name_node = document.createTextNode(name_text);

if (name_element) name_element.appendChild(name_node);
```

---

<!-- If we need to be able to update the value of the variable, we're going to need a function. -->

```javascript
const name_element = document.getElementById('name');

function update_name(new_name) {
  if (name_element) name_element.innerHTML(new_name);
}
```

---

<!-- With Svelte, we could render this name in the HTML like so: -->

```html
<h1>Hello {name}!</h1>
```

<!-- In this case, the `{name}` will be replaced with the value of the `name` variable. So the output would be `Hello world!`. -->

---

<!-- Here's a complete basic Svelte component: -->

```html
<script>
  let name = 'world';
</script>

<h1>Hello {name}!</h1>
```

<!-- This is a basic greeter component. The string 'world' is assigned to the reactive variable `name`, and then in the HTML, 'world' will be rendered to the DOM. When viewed in a browser, a user will see "Hello world!". -->

<!-- If the value of the `name` variable changes, Svelte will automatically update the reference in the DOM to display the new value. -->

# Discuss Dynamic Attributes

<!-- Dynamic attributes in Svelte are powerful features that allow you to bind HTML element attributes to reactive JavaScript variables. With dynamic attributes, you can control elements' properties based on the state of your application. -->

<!-- For instance, let's say you have a color variable that controls the text color of a paragraph. Here is an example: -->

```html
<script>
  let color = 'blue';
</script>

<p style="color: {color};">This is a {color} paragraph.</p>

<button on:click={() => color = 'red'}>Change to Red</button>
```

<!-- The `color` variable has initially been assigned the 'blue' string. In the HTML, the color of the paragraph is bound to this variable: `style="color: {color};"`. This means that the color of the paragraph will be whatever the `color` variable is currently set to. The second curly braces, `{color}` inside the paragraph, displays the current color. -->

<!-- In addition, there's a button with an `on:click` event. When this button is clicked, it's going to run a function that changes the `color` variable to 'red'. -->

<!-- So, initially, there's a blue-colored paragraph saying, "This is a blue paragraph." When the button is clicked, the text color and the text itself change to red. -->

<!-- This illustrates how you can use dynamic attributes in Svelte to create interactive components. Changing the value of a variable changes the state of your component, immediately reflecting in your HTML. -->

# Discuss Nesting Components

<!-- Nesting components is a common practice in Svelte and other component-based frameworks or libraries. This allows the construction of complex user interfaces from smaller, reusable, and manageable pieces. This concept promotes code reusability and modularity. -->

## Child Components

<!-- A child component in Svelte can be included in a parent component just like a regular HTML tag. Here's how you can do it: -->

```html
<!-- Child.svelte -->
<p>Hello world</p>
```

```html
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';
</script>

<Child />
```

## Naming Convention

- `Button.svelte`
- `MyComponent.svelte`

<!-- As for naming conventions, Svelte modules are typically given capital camel case names (e.g., `MyComponent.svelte`) as it matches the way they are used in markup (e.g., `<MyComponent/>`). -->

## Project Directory Structure

<!-- Here's the preferred directory structure and naming conventions for a typical SvelteKit application: -->

```
src/
├── routes/
│   ├── +page.svelte
├── lib/
│   ├── Button.svelte
└── app.html
```

<!-- **`src/app.html`**: This is the template file where your Svelte application lives. SvelteKit uses this to generate HTML files for your routes. -->

<!-- **`src/routes/`**: This is where you define your application's pages. Each `.svelte` file corresponds to a route based on its filename. For example, `src/routes/about.svelte` would correspond to the '/about' route. -->

<!-- **`src/lib/`**: This is a convention for optional location to keep your reusable components and utility functions - the building blocks of your application. The elements in this specific location are not associated with any route on their own. Files in this directory can be imported and used in multiple routes or other components. -->

---

<!-- For instance, you might have a `Button.svelte` in your `src/lib/` directory: -->

```html
<!-- src/lib/Button.svelte -->
<script>
  let { text = 'Click Me' } = $props();
</script>

<button>{text}</button>
```

---

<!-- You can then import and use your `Button` component inside any Svelte component of your application: -->

```html
<!-- src/routes/index.svelte -->
<script>
  import Button from '$lib/Button.svelte';
</script>

<button text="Select Me" />
```

## The `$lib` alias

<!-- In SvelteKit, `$lib` is an alias for the `src/lib` directory. This feature improves code clarity and eases file management in larger SvelteKit projects. -->

<!-- In our example, we have a Svelte component called `Button.svelte` inside the `lib` folder. You will traditionally import it using a relative path, like so: -->

```html
<!-- src/routes/contact/+page.svelte -->
<script>
  import Button from '../../lib/Button.svelte';
</script>
```

<!-- When your codebase grows, and directory levels become deeply nested, maintaining this kind of relative path becomes complicated. -->

---

<!-- With the `$lib` alias, you can simplify the import path no matter the depth of your current file in the directory structure: -->

```html
<script>
  import Button from '$lib/Button.svelte';
</script>
```

<!-- Here, `$lib` automatically points to the `src/lib` directory. SvelteKit's Vite configuration takes care of resolving the `$lib` alias to the actual path, which makes importing handy in your project. It's always recommended to place your reusable components and utilities inside `src/lib` and make the best use of the `$lib` alias. -->

### `$lib` Vite config

<!-- When creating a SvelteKit project with Vite, you don't need to do anything special to use the `$lib` alias. It's built-in within the SvelteKit framework out of the box. -->

<!-- The `$lib` alias points to the `src/lib` directory in a SvelteKit project. Thus, when you use `$lib/someModule`, it's equivalent to `src/lib/someModule`. -->

<!-- However, if for some reason it is not working, ensure that in your `svelte.config.js` file the vite configuration hasn't been overwritten. The alias configuration section should look something like this: -->

```javascript
const config = {
  kit: {
    vite: {
      resolve: {
        alias: {
          $lib: path.resolve('./src/lib'),
        },
      },
    },
  },
};
```

# Special tags

## `@html`

<!-- Svelte’s `@html` tag is used to render a string as raw HTML. This is particularly useful when you want to insert HTML elements from a string directly into your markup. -->

<!-- Here’s a simple example: -->

```html
<script>
  let html_string = '<p>This is a paragraph.</p>';
</script>

<div>{@html html_string}</div>
```

<!-- In the script part of the Svelte component, the `html_string` variable is assigned a string containing HTML tags. Using `{@html html_string}` in the markup of the Svelte component, the string is directly rendered as HTML. So, in this case, the paragraph element is displayed in the browser, not the literal string. -->

<!-- Although the `@html` tag is powerful, it's important to be aware of the risk associated with inserting raw HTML into your components. If user input is rendered with `@html` without sanitizing, it can lead to a Cross-Site Scripting (XSS) attack. Always sanitize user-generated content to avoid such vulnerabilities. -->

<!-- Here's another example with user input: -->

```html
<script>
  let user_html_input = "<script>console.log('This is risky!')</script>";
</script>

<div>{@html user_html_input}</div>
```

<!-- In this scenario, the string contains a `<script>` tag which could be potentially harmful. If `user_html_input` is user-provided, they could inject malicious scripts into your webpage. -->

<!-- While `@html` is a convenient feature of Svelte for rendering raw HTML, its use must be handled with great care when dealing with user-provided data. -->

## `<svelte:window />`

<!-- The `<svelte:window>` element allows you to add event listeners to the window object without worrying about removing them when the component is destroyed, or checking for the existence of window when server-side rendering. -->

```html
<script>
  let y;
</script>
<svelte:window bind:scrollY="{y}" />
```

<!-- You can bind the following properties to `<svelte:window>`: -->

- innerWidth
- innerHeight
- outerWidth
- outerHeight
- scrollX
- scrollY
- devicePixelRatio

## `<svelte:document />`

<!-- Similarly to `<svelte:window>`, this element allows you to add listeners to events on document, such as visibilitychange, which don't fire on window. It also lets you use actions on document. -->

```html
<svelte:document on:event="{handler}" />

<svelte:document bind:prop="{value}" />
```

## `<svelte:body />`

<!-- Similarly to `<svelte:window>`, this element allows you to add listeners to events on document.body, such as mouseenter and mouseleave, which don't fire on window. It also lets you use actions on the `<body>` element. -->

```html
<svelte:body
  on:mouseenter="{handle_mouse_enter}"
  on:mouseleave="{handle_mouse_leave}"
/>
```

```javascript
const body = document.body;

body.addEventListener('mouseenter', handle_mouse_enter);
body.addEventListener('mouseleave', handle_mouse_leave);
```

```html
<svelte:body
  on:mouseenter="{handle_mouse_enter}"
  on:mouseleave="{handle_mouse_leave}"
/>
```

## `<svelte:head />`

<!-- This element makes it possible to insert elements into document.head. During server-side rendering, head content is exposed separately to the main html content. -->

```html
<svelte:head>
  <title>Hello world!</title>
  <meta
    name="description"
    content="This is where the description goes for SEO"
  />
</svelte:head>
