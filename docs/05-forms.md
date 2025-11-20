---
marp: true
class: invert
footer: 'Forms'
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


- [IDM364: Forms](#idm364-forms)
- [Lesson Objectives](#lesson-objectives)
- [The `<form>` Element](#the-form-element)
- [Named `<form>` actions](#named-form-actions)
- [Form validation](#form-validation)
- [Progressive Enhancement](#progressive-enhancement)
  - [What's enhanced?](#whats-enhanced)

# IDM364: Forms

# Lesson Objectives

* Discuss using the `<form>` element
* Review named form actions
* Discuss form validation
* Discuss progressive enhancement
* Introduce `use:enhance`

# The `<form>` Element

<!-- Handling forms is an integral part of building any web application. SvelteKit provides an intuitive way to handle form data and interact with server-side logic. -->

---

<!-- In SvelteKit, you can use the `<form`> HTML element in your Svelte file to create forms. Using DOM events such as `submit`, you can attach event handlers that can manage the form data and send it to a server. -->

```html
<form method="POST">
```

---

<!-- A `+page.server.js` file can export actions, which allow you to POST data to the server using the `<form>` element. -->

```javascript
export const actions = {
  default: async (event) => {
    // form submission
  }
};
```

---

<!-- Each action receives a [RequestEvent](https://kit.svelte.dev/docs/types#public-types-requestevent) object, allowing you to read the data with `request.formData()`. After processing the request, the action can respond with data that will be available through the `form` property on the corresponding page and through `$page.form` app-wide until the next update. -->

```html
<form method="POST">
  <label for="name">Name</label>
  <input type="text" name="name" />
</form>
```

```javascript
export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    return { success: true };
  }
};
```

<!-- Let's work through an example: [Forms example](../../examples/05-forms/05-forms.md) -->

# Named `<form>` actions

<!-- Most of the time you'll need to have multiple actions on a page. Think about a simple todo app. You'll need actions to create and delete items in your database. -->

---

<!-- We can use named form actions instead of the default action to provide multiple actions to our routes. -->

```javascript
export const actions = {
  create: async ({ request }) => {
    // create a todo item
  },

  delete: async ({ request }) => {
    // delete a todo item
  }
}
```

<!-- **Note** that default actions cannot coexist with named actions. -->

<!-- Let's update our example. -->

# Form validation

<!-- You can't trust users. Forms are dangerous because they offer users a chance to introduce chaos in our apps. -->

---

<!-- The browser's built-in form validation system is a good start, but not enough. -->

```html
<input
  name="email"
  type="email"
  required
/>
```

<!-- Marking an input as `required` will make sure there's a value present. -->

---

```html
<input
  name="email"
  type="email"
  required
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
/>
```

<!-- Regular expressions can help validate the input's pattern. We need to progressively enhance our form interactions with JavaScript to provide the best user experience. -->

# Progressive Enhancement

<!-- In our application, we employ the `<form>` element, which functions even without JavaScript availability. However, when users do have JavaScript enabled, we can progressively enrich their experience. -->

<!-- Import the `enhance` function from `$app/forms`. -->

```html
<script lang="js">
  import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/login" use:enhance>
```

<!-- Add the `use:enhance` directive to the `<form>` element. Thats it! -->

## What's enhanced?

<!-- Now, when JavaScript is enabled, use:enhance will emulate the browser-native behavior except for the full-page reloads. It will: -->

- update the form prop
- invalidate all data on a successful response
- load functions to re-run
- navigate to the new page on a redirect response
- render the nearest error page if an error occurs

<!-- We're emulating the browser's native behavior, and since we're basically updating the page instead of reloading it, we can do some fun stuff like add animations and transitions. -->

<!-- Let's work through an example: [Forms Example](../../examples/05-forms/05-forms.md) -->
