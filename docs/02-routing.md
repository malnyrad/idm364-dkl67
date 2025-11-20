---
marp: true
class: invert
footer: 'Routing'
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

- [IDM364: Sveltekit Routing & File Names](#idm364-sveltekit-routing--file-names)
- [Lesson Objectives](#lesson-objectives)
- [Discuss Svelte routing](#discuss-svelte-routing)
  - [Svelte routing](#svelte-routing)
  - [Dynamic routes](#dynamic-routes)
  - [Layout routes](#layout-routes)
    - [The `<slot>`](#the-slot)
    - [Providing default slot content](#providing-default-slot-content)
    - [Multiple named slots](#multiple-named-slots)
    - [Targeting named slots](#targeting-named-slots)
    - [Passing data through slot props](#passing-data-through-slot-props)
  - [Error pages](#error-pages)
  - [Endpoints](#endpoints)
- [Discuss Sveltekit file naming & directory structure](#discuss-sveltekit-file-naming--directory-structure)
  - [`+page.svelte`](#pagesvelte)
  - [`+layout.svelte`](#layoutsvelte)
  - [`+page.js` & `+page.server.js`](#pagejs--pageserverjs)
    - [`+page.js`](#pagejs)
    - [`+page.server.js`](#pageserverjs)
  - [`+layout.js` & `+layout.server.js`](#layoutjs--layoutserverjs)
    - [`+layout.js`](#layoutjs)
    - [`+layout.server.js`](#layoutserverjs)
- [Discuss how to handle route parameters and query parameters in SvelteKit](#discuss-how-to-handle-route-parameters-and-query-parameters-in-sveltekit)
  - [Route parameters](#route-parameters)
  - [Query parameters](#query-parameters)
  - [`module` context](#module-context)
- [Discuss how to create server routes in SvelteKit](#discuss-how-to-create-server-routes-in-sveltekit)
  - [`+server.js` `GET` example](#serverjs-get-example)
  - [Other methods](#other-methods)

# IDM364: Sveltekit Routing & File Names

# Lesson Objectives

* Discuss Svelte routing
* Discuss SvelteKit file naming & directory structure
* Discuss how to handle route parameters and query parameters in SvelteKit
* Discuss how to create server routes in SvelteKit

# Discuss Svelte routing

## Svelte routing

- `src/routes/+page.svelte` = root route (`/`).
- `src/routes/about/+page.svelte` = `/about` route.
- `src/routes/blog/+page.svelte` = `/blog` route.

<!-- SvelteKit uses a file-based routing system, which means that the structure of your `src/routes` directory determines the routes of your application. Here's how it works: -->

## Dynamic routes

`src/routes/blog/[slug]/+page.svelte`

- `/blog/my-first-post`
- `/blog/hello-world`,

<!-- SvelteKit also supports dynamic routes: -->

<!-- The part in the square brackets ([`slug`]) is a dynamic parameter, and you can access its value in your Svelte component. -->

## Layout routes

- `src/routes/+layout.svelte`
- `src/routes/blog/+layout.svelte`

<!-- You can create layout components that wrap other components: -->

<!-- A file named `src/routes/+layout.svelte` will act as a layout for all routes. -->

<!-- A file named `src/routes/blog/+layout.svelte` will act as a layout for all routes under `/blog`. -->

### The `<slot>`

<!-- The `<slot>` element in Svelte is used to define a placeholder in a component's markup where other content can be inserted. This allows you to create reusable components that can be customized with different content depending on where they are used. -->

<!-- When you use a component that contains a `<slot>` element, you can pass content to be inserted into the slot using the component's props. The content can be any valid Svelte markup, including other components. -->

<!-- Here's an example of a component that uses a `<slot>` element: -->

```html
<!-- +layout.svelte -->
<header />
<main>
  <slot></slot>
</main>
<footer />
```

<!-- In this example, the `<slot>` element is used to define a placeholder for content that will be inserted into the component. -->

### Providing default slot content

<!-- To provide default content for your `<slot>` element, you can place them inside the `<slot>` element, like so: -->

```html
<div class="card">
  <slot>
    <div>this is the default content</div>
  </slot>
</div>
```

### Multiple named slots

<!-- You can define multiple slots in a component and name them to target specific areas for dynamic content. You can use the name attribute on the `<slot>` element to give the slot a name, as shown in the following code: -->

```html
<!-- filename: Card.svelte -->
<div class="card">
  <header>
    <slot name="header"></slot>
  </header>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

### Targeting named slots

<!-- To target the dynamic content into these named slots, you will need to use the `<svelte:fragment>` element in the parent component: -->

```html
<script>
  import Card from './Card.svelte';
</script>

<Card>
  <svelte:fragment slot="header">
    <h1>Special headline</h1>
  </svelte:fragment>
  <svelte:fragment slot="footer">
    Custom footer
  </svelte:fragment>
</Card>
```

### Passing data through slot props

<!-- You can pass data from the child component back to the dynamic content in the parent component using slot props, like so: -->

```html
<!-- filename: Card.svelte -->
<div class="card">
  <header>
    <slot name="header" width={30} height={50}></slot>
  </header>
</div>
```

<!-- These additional attributes, width and height, serve as slot props; their values can be accessed in the parent component when you create dynamic content. -->

---

<!-- Here is an example of how you can use these slot prop values when using `<svelte:fragment>` -->

```html
<script>
  import Card from './Card.svelte';
</script>
<Card>
  <svelte:fragment slot="header" let:width let:height>
    <h1>Dimension: {width} x {height}</h1>
  </svelte:fragment>
</Card>
```

<!-- You can see that we use `let:width` and `let:height` within the `<svelte:fragment>` element. These are called `let: bindings`, and they let us access the `width` and `height` slot props provided by the child component. -->

## Error pages

- `src/routes/+error.svelte`

## Endpoints

- `src/routes/api/hello.js`
- `src/routes/api/hello.ts`

Maps to:

- `/api/hello`

# Discuss Sveltekit file naming & directory structure

<!-- Modern Sveltekit projects use a a specific file naming convention and directory structure. -->

## `+page.svelte`

- `src/routes/+page.svelte`
- `src/routes/blog/+page.svelte`
- `src/routes/blog/[slug]+page.svelte`

<!-- The `+page.svelte` file is used to define a dynamic parameter at the directory level. This is useful when you want to create nested dynamic routes. For example, if you have a file structure like this: -->

<!-- This would match routes like /blog/my-first-post, /blog/hello-world, etc. The [slug] part is a dynamic parameter, and you can access its value in your Svelte component. -->

## `+layout.svelte`

- `src/routes/+layout.svelte`
- `src/routes/blog/+layout.svelte`
- `src/routes/blog/[slug]+layout.svelte`

<!-- The `+layout.svelte` file is used to define a layout that wraps all routes in a directory, including dynamic ones. For example, if you have a file structure like this: -->

<!-- The `+layout.svelte` file would act as a layout for all routes under /blog, including the dynamic routes defined by +page.svelte. -->

## `+page.js` & `+page.server.js`

- `src/routes/+page.svelte`
- `src/routes/+page.js`
- `src/routes/+page.server.js`

<!-- In SvelteKit, the `+page.js`, `+page.server.js`, `+layout.js`, and `+layout.server.js` files are used to define server-side logic for dynamic routes and layouts. -->

<!-- The `+page.js` and `+page.server.js` files are used to define logic for dynamic pages. These files should export a load function that runs on the server before the page is rendered. The load function can fetch data, check user permissions, etc. -->

### `+page.js`

```javascript
import { error } from '@sveltejs/kit';

export function load({ params }) {
  if (params.slug === 'hello-world') {
    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
    };
  }

  throw error(404, 'Not found');
}
```

<!-- Often, a page will need to load some data before it can be rendered. For this, we add a `+page .js` module that exports a `load` function. This function runs alongside `+page.svelte`, which means it runs on the server during server-side rendering and in the browser during client-side navigation. The load function in the `+page.js` file can fetch the blog post with the given slug, and pass it as a prop to the +page.svelte file. -->

### `+page.server.js`

```javascript
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const post = await getPostFromDatabase(params.slug);

  if (post) {
    return post;
  }

  throw error(404, 'Not found');
}
```

<!-- If your load function can only run on the server — for example, if it needs to fetch data from a database or you need to access private environment variables like API keys — then you can rename `+page.js` to `+page.server.js`. This can be useful for sensitive operations that should not be exposed to the client. -->

## `+layout.js` & `+layout.server.js`

- `src/routes/+layout.svelte`
- `src/routes/+layout.js`
- `src/routes/+layout.server.js`

<!-- The `+layout.js` and `+layout.server.js` files are used to define logic for dynamic layouts. Like the `+page.js` and `+page.server.js` files, these files should export a load function. -->

### `+layout.js`

```javascript
export function load() {
  return {
    sections: [
      { slug: 'profile', title: 'Profile' },
      { slug: 'notifications', title: 'Notifications' },
    ],
  };
}
```

<!-- Just like +page.svelte loading data from `+page.js` , your `+layout.svelte` component can get data from a load function in `+layout.js`. -->

<!-- The load function in the `+layout.js` file can fetch data, check user permissions, etc. -->

### `+layout.server.js`

```javascript
export function load() {
  return {
    sections: [
      { slug: 'profile', title: 'Profile' },
      { slug: 'notifications', title: 'Notifications' },
    ],
  };
}
```

<!-- The `+layout.server.js` file is similar to `+layout.js`, but it only runs on the server and not in the browser. This can be useful for sensitive operations that should not be exposed to the client. -->

# Discuss how to handle route parameters and query parameters in SvelteKit

<!-- In SvelteKit, route parameters and query parameters are handled in the load function, which is a server-side function that runs when a page is first loaded. -->

## Route parameters

<!-- Route parameters are defined in the file structure of your `src/routes` directory. For example, if you have a file named `[id].svelte` in your `src/routes/blog` directory, `id` is a route parameter. You can access this parameter in the `load` function like this: -->

```javascript
export async function load({ page, fetch }) {
  const { id } = page.params;
  // Now you can use the id parameter
}
```

Example: `/blog/42`

<!-- In this example, if you navigate to `/blog/42`, id will be `"42"`. -->

## Query parameters

<!-- Query parameters are part of the URL after the `?`. For example, in the URL `/search?q=svelte`, `q` is a query parameter. You can access query parameters in the `load` function like this: -->

```javascript
export async function load({ page, fetch }) {
  const { q } = page.query;
  // Now you can use the q parameter
}
```

Example: `/search?q=svelte`

<!-- In this example, if you navigate to `/search?q=svelte`, `q` will be `"svelte"`. -->

## `module` context

```html
<!-- src/routes/+page.svelte -->
<script context="module">
  export async function load({ page, fetch }) {
    const { id } = page.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      return { props: { post: data } };
    } else {
      return {
        status: res.status,
        error: new Error(`Could not load blog post ${id}`),
      };
    }
  }
</script>
```

<!-- In this example, the `load` function is defined in the `context="module"` script tag, which means it runs once per module, rather than once per component instance. The `load` function fetches a blog post based on the id route parameter and passes it as a prop to the component. -->

---

```html
<script>
  export let post;
</script>

<article>
  <h1>{post.title}</h1>
  <p>{post.body}</p>
</article>
```

<!-- **NOTE**: The `+page.server.js` file is used for server-side rendering (SSR) and server-side logic. It's not typically where you'd define the `load` function. -->

<!-- **LINK**: [module context](./module_context.md) -->

# Discuss how to create server routes in SvelteKit

## `+server.js` `GET` example

<!-- In SvelteKit, server routes are created by defining functions in `.js` or `.ts` files within the `src/routes` directory. These functions can handle HTTP requests and return responses, similar to how you would in a traditional server-side framework. -->

<!-- Here's a basic example of a server route that handles a `GET` request: -->

```javascript
// src/routes/api/hello/+server.js
export async function GET() {
  return new Response('hello world');
}
```

<!-- In this example, when you navigate to `/api/hello`, the `GET` function will be called and will return a JSON response with a `message` of `'Hello, world!'`. -->

[.build-lists: false]

## Other methods

<!-- You can also handle other HTTP methods by defining functions named `POST`, `PUT`, `DEL`, etc. For example, here's how you might handle a `POST` request: -->

- `GET`
- `POST`
- `PUT`
- `DEL`
