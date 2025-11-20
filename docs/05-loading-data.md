---
marp: true
class: invert
footer: 'Loading Data'
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

- [IDM364: Loading Data](#idm364-loading-data)
- [Lesson Objectives](#lesson-objectives)
- [Sveltekit's job](#sveltekits-job)
- [Loading Page Data](#loading-page-data)
- [Loading Layout Data](#loading-layout-data)

# IDM364: Loading Data

# Lesson Objectives

* Discuss Loading Page Data
* Discuss Loading Layout Data

# Sveltekit's job

1. Routing
2. Loading
3. Rendering

<!-- Routing — figure out which route matches an incoming request -->

<!-- Loading — get the data needed by the route -->

<!-- Rendering - generate some HTML (on the server) or update the DOM (in the browser) -->

# Loading Page Data

```javascript
// +page.server.js
export function load() {
  return {
    // return object
  }
}
```

<!-- In SvelteKit, there is a built-in mechanism to load data on the server-side which is necessary to make your pages dynamic. This mechanism uses a special function called `load` which is a lifecycle function for Svelte components. -->

<!-- The `load` function runs on both the server and in the client browser when you navigate to a page. It lets you load the data your page depends on, and can be asynchronous (e.g., it can fetch data over the network). -->

<!-- Every page of your app can declare a `load` function in a `+page.server.js` file alongside the `+page.svelte` file. As the file name suggests, this module only ever runs on the server, including for client-side navigation. -->

# Loading Layout Data

<!-- Similar to loading data for a page, you can also load data for a layout. Layouts in SvelteKit are the shared components that surround your pages. -->

<!-- Just like pages, layout components can have a `load` function. This can be useful when you need some data to be loaded and be available for all the pages that use the layout. Here's how you can do this: -->

```javascript
// +layout.server.js
export function load() {
  return {
    // return object
  }
}
```

<!-- Let's work through an example: [Loading Data Example](../../examples/05-loading-data/05-loading-data.md) -->
