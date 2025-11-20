# Forms

- [Forms](#forms)
  - [Default form actions](#default-form-actions)
    - [Setup `+page.svelte`](#setup-pagesvelte)
    - [Setup `+page.server.js`](#setup-pageserverjs)
    - [Use returned values](#use-returned-values)
  - [Add named actions examples](#add-named-actions-examples)
    - [Setup `src/routes/signin/+page.svelte`](#setup-srcroutessigninpagesvelte)
    - [Setup `src/routes/signin/+page.server.js`](#setup-srcroutessigninpageserverjs)
    - [Update `src/routes/signin/+page.svelte`](#update-srcroutessigninpagesvelte)
  - [Form validation](#form-validation)
    - [Setup `/src/lib/database.js`](#setup-srclibdatabasejs)
    - [Update `src/routes/signin/+page.server.js`](#update-srcroutessigninpageserverjs)
    - [Update `src/routes/signin/+page.svelte`](#update-srcroutessigninpagesvelte-1)
  - [Progressive Enhancement](#progressive-enhancement)
    - [Add animations](#add-animations)
    - [🛑 Add custom enhancements 🛑](#-add-custom-enhancements-)

## Default form actions

### Setup `+page.svelte`

```html
<!-- +page.svelte -->
<form method="POST">
  <label for="name">Name</label>
  <input type="text" name="name" required placeholder="jane doe" value="jane doe" />
  <button type="submit">Submit</button>
</form>
```

### Setup `+page.server.js`

```javascript
/**
 * `actions` is an object that contains methods for handling different actions.
 * @type {import('./$types').Actions} */
export const actions = {
  /**
   * The default action that is executed if no other action is specified.
   * It logs the request form data to the console.
   *
   * @param {Object} context - The context object.
   * @param {Object} context.request - The request object.
   * @param {function(): Promise<any>} context.request.formData - The method to get form data.
   * @returns {Promise<{name: string, success: boolean}>} A Promise that resolves when the action has been executed.
   */
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');

    // Process the form, update the database, work your magic.
	console.log(data) // log appears on the server, not in the browser

    return {
      name,
      success: true
    };
  }
};
```

### Use returned values

```html
<!-- +page.svelte -->
<script lang="js">
  const { form } = $props();
</script>

<form method="POST">
    <label for="name">Name</label>
    <input type="text" name="name" required placeholder="jane doe" value="jane doe" />
	<button type="submit">Submit</button>
  {#if form?.success}
    <p>Form submitted!</p>
    <p>Thank you {form.name}</p>
  {/if}
</form>
```

The `form` variable in `+page.svelte` is a Svelte component prop. It's exported from the script tag, which means it's a value that can be passed into the component from a parent component or from a server-side function.

In this case, the `form` variable is being populated by the server-side function in `+page.server.js`. The `default` action in the actions object is returning an object with `name` and `success` properties. This returned object is passed to the Svelte component as the `form` prop.

This is part of SvelteKit's server-side rendering (SSR) feature. When a request is made to the server for this page, the server runs the `default` action, gets the result, and passes it to the Svelte component as the `form` prop. The Svelte component then uses this prop to render the page.

So, even though `form` is not explicitly referenced in `+page.server.js`, it's implicitly used as the return value of the `default` action, which is then passed to the Svelte component as a prop.

## Add named actions examples

```bash
mkdir src/routes/signin
touch src/routes/signin/+page.svelte; touch src/routes/signin/+page.server.js
```

### Setup `src/routes/signin/+page.svelte`

```svelte
<h1>My Todo App</h1>

<section>
  <h2>Sign in or register with email:</h2>
  <form method="POST" action="?/login">
    <label for="email">Email:</label>
    <input
      name="email"
      placeholder="svelte@example.com"
      type="email"
      value="svelte@example.com"
      required
    />
    <button formaction="?/login">Log in</button>
    <button formaction="?/register">Register</button>
  </form>
</section>
```

### Setup `src/routes/signin/+page.server.js`

```javascript
/**
 * `actions` is an object that contains methods for handling different actions.
 * @type {import('./$types').Actions} */
export const actions = {
  /**
   * Logs in a user.
   * @param {Object} context - The context object.
   * @param {Object} context.request - The request object.
   * @param {function(): Promise<any>} context.request.formData - The method to get form data.
   * @returns {Promise<{email: string, login_success: boolean}>} A Promise that resolves with the email and login status.
   */
  login: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');

    // If successfully logged in...
    return {
      email,
      login_success: true
    };
  },

  /**
   * Registers a user.
   * @param {Object} context - The context object.
   * @param {Object} context.request - The request object.
   * @param {function(): Promise<any>} context.request.formData - The method to get form data.
   * @returns {Promise<{email: string, register_success: boolean}>} A Promise that resolves with the email and registration status.
   */
  register: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');

    // If successfully registered...
    return {
      email,
      register_success: true
    };
  }
};
```

### Update `src/routes/signin/+page.svelte`

```diff
+ <script lang="js">
+   const { form } = $props();
+ </script>

<h1>My Todo App</h1>

<section>
  <h2>Sign in or register with email:</h2>
  <form method="POST" action="?/login">
    <label for="email">Email:</label>
    <input
      name="email"
      placeholder="svelte@example.com"
      type="email"
      value="svelte@example.com"
      required
    />
    <button formaction="?/login">Log in</button>
    <button formaction="?/register">Register</button>
  </form>
</section>

+ {#if form?.login_success}
+   <p>{form.email} logged in!</p>
+ {/if}
+
+ {#if form?.register_success}
+   <p>{form.email} registered!</p>
+ {/if}
```

## Form validation

```bash
mv src/lib/index.js src/lib/database.js
```

### Setup `/src/lib/database.js`

```javascript
/**
 * List of invalid domains.
 * @type {string[]}
 */
const invalid_domains = ['example.com'];

/**
 * Logs in a user.
 * @param {string} email - The email of the user.
 * @returns {{email: string, login_success: boolean, message?: string}} - The login status and potential error message.
 */
export function user_login(email) {
  // Extract the domain from the email
  const domain = email.split('@')[1];

  if (invalid_domains.includes(domain)) {
    return {
      email,
      login_success: false,
      message: 'Invalid domain'
    };
  }

  return {
    email,
    login_success: true
  };
}
```

### Update `src/routes/signin/+page.server.js`

```diff
+ import * as db from '$lib/database';

/**
 * `actions` is an object that contains methods for handling different actions.
 * @type {import('./$types').Actions} */
export const actions = {
  /**
   * Logs in a user.
   * @param {Object} context - The context object.
   * @param {Object} context.request - The request object.
   * @param {function(): Promise<any>} context.request.formData - The method to get form data.
-  * @returns {Promise<{email: string, login_success: boolean}>} A Promise that resolves with the email and login status.
+  * @returns {Promise<{email: string, login_success: boolean, message?: string}>} A Promise that resolves with the email and login status.
   */
  login: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');

-   return {
-     email,
-     login_success: true
-   };

+   try {
+     return db.user_login(email);
+   } catch (error) {
+     if (error instanceof Error) throw new Error(error.message);
+     else throw error;
+   }
  },
};
```

### Update `src/routes/signin/+page.svelte`

```diff
<script lang="js">
  const { form } = $props();

+ let email_input = $state(null);

+ $effect(() => {
+   if (email_input && form?.message) email_input.focus();
+ });
</script>

<h1>My Todo App</h1>

<section>
  <h2>Sign in or register with email:</h2>
  <form method="POST" action="?/login">
    <label for="email">Email:</label>
    <input
+     bind:this={email_input}
      name="email"
      placeholder="svelte@example.com"
      type="email"
      required
    />
    <button formaction="?/login">Log in</button>
    <button formaction="?/register">Register</button>
  </form>
</section>

{#if form?.login_success}
  <p>{form.email} logged in!</p>
+ {:else if form?.message}
+   <p>{form.message}</p>
+ {/if}

{#if form?.register_success}
  <p>{form.email} registered!</p>
{/if}
```

## Progressive Enhancement

```diff
# src/routes/signin/+page.svelte
<script lang="js">
+ import { enhance } from '$app/forms';

  export let form;

  let /** @type {HTMLInputElement}*/ email_input;

  $: {
    if (email_input && form?.message) email_input.focus();
  }
</script>

<h1>My Todo App</h1>

<section>
  <h2>Sign in or register with email:</h2>
- <form method="POST" action="?/login">
+ <form method="POST" action="?/login" use:enhance>
    <label for="email">Email:</label>
    <input
      bind:this={email_input}
      name="email"
      placeholder="svelte@example.com"
      type="email"
      required
    />
    <button formaction="?/login">Log in</button>
    <button formaction="?/register">Register</button>
  </form>
</section>
```

### Add animations

```diff
<script lang="js">
  import { enhance } from '$app/forms';
+ import { fly, slide } from 'svelte/transition';

  export let form;

  let /** @type {HTMLInputElement}*/ email_input;

  $: {
    if (email_input && form?.message) email_input.focus();
  }
</script>

{#if form?.login_success}
- <p>{form.email} logged in!</p>
+ <p in:fly={{ y: 20 }} out:slide>{form.email} logged in!</p>
{:else if form?.message}
- <p>{form.message}</p>
+ <p in:fly={{ y: 20 }} out:slide>{form.message}</p>
{/if}

{#if form?.register_success}
- <p>{form.email} registered!</p>
+ <p in:fly={{ y: 20 }} out:slide>{form.email} registered!</p>
{/if}
```

---

### 🛑 Add custom enhancements 🛑

Add a fake delay in our server code to simulate communication with a database.

```diff
# src/routes/signin/+page.server.js
login: async ({ request }) => {
+ await new Promise((fulfill) => setTimeout(fulfill, 3000));
```

```diff
# src/routes/signin/+page.svelte
<script lang="js">
  import { enhance } from '$app/forms';
  import { fly, slide } from 'svelte/transition';

  const { form } = $props();

  let email_input = $state(null);

  $effect(() => {
    if (email_input && form?.message) email_input.focus();
  });

+ let signing_in = $state(false);
</script>

<form
  method="POST"
  action="?/login"
- use:enhance
+ use:enhance={() => {
+   signing_in = true;
+   return async ({ update }) => {
+     await update();
+     signing_in = false;
+   };
+ }}
  >
  ...
  </form>

+ {#if signing_in}
+   <span>signing in...</span>
+ {/if}
```

This code is returning an asynchronous function that takes an object with a method named `update`. Here's a breakdown:

- `return async ({ update }) => {...}`: This is an arrow function that is being returned. The `async` keyword means that the function returns a Promise. The function takes one argument, an object, and it destructures the `update` method from it.
- `await update();`: This line is calling the `update` method and waiting for it to complete. The `await` keyword can only be used inside an `async` function and it makes JavaScript wait until the Promise settles and returns its result.
- `signing_in = false;`: This line is setting the variable `signing_in` to `false`. This variable is not defined within the function, so it must be defined in an outer scope.
