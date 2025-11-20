---
marp: true
class: invert
footer: 'Introduction'
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

- [IDM364: Introduction](#idm364-introduction)
  - [About This Course](#about-this-course)
- [Lesson Objectives](#lesson-objectives)
- [Introduce Svelte \& Sveltekit](#introduce-svelte--sveltekit)
  - [Svelte's Unique Approach](#sveltes-unique-approach)
  - [Reactive Declarations](#reactive-declarations)
  - [SvelteKit: The Full Package](#sveltekit-the-full-package)
- [Discuss the Svelte ecosystem and community](#discuss-the-svelte-ecosystem-and-community)
  - [Svelte Ecosystem and Community](#svelte-ecosystem-and-community)
- [Compare Svelte with other popular frameworks](#compare-svelte-with-other-popular-frameworks)
    - [React](#react)
    - [Vue](#vue)
    - [Svelte](#svelte)
      - [Svelte 5](#svelte-5)
- [Provide examples of real-world applications built with Svelte and SvelteKit](#provide-examples-of-real-world-applications-built-with-svelte-and-sveltekit)
- [Discuss how to set up a new Svelte or SvelteKit project](#discuss-how-to-set-up-a-new-svelte-or-sveltekit-project)
  - [Create a new Sveltekit project](#create-a-new-sveltekit-project)
    - [Use Vite](#use-vite)
- [Introduce the basic syntax and concepts of Svelte and SvelteKit](#introduce-the-basic-syntax-and-concepts-of-svelte-and-sveltekit)
  - [Basic Syntax \& Concepts of Svelte](#basic-syntax--concepts-of-svelte)
    - [CSS](#css)
    - [JavaScript](#javascript)
  - [Routing](#routing)
- [Introduce modern database options](#introduce-modern-database-options)
  - [Firestore](#firestore)
  - [Supabase](#supabase)
  - [MySQL](#mysql)

# IDM364: Introduction

## About This Course

- [Drexel Learn](https://learn.dcollege.net/webapps/login/)

<!-- All course information including syllabus, overview and assignments will be managed through Drexel's Blackboard (BBLearn) system. Let's log in and review the syllabus and course information now. -->

# Lesson Objectives

* Introduce Svelte & Sveltekit
* Discuss the Svelte ecosystem and community
* Compare Svelte with other popular frameworks
* Provide examples of real-world applications built with Svelte and SvelteKit
* Discuss how to set up a new Svelte or SvelteKit project
* Introduce the basic syntax and concepts of Svelte and SvelteKit
* Introduce modern database options

# Introduce Svelte & Sveltekit

<!--
_footer: ""
_paginate: hide
-->

<style scoped>
h1 {
  color: #010101;
  text-align: center;
}
</style>

![bg](https://static.cdnlogo.com/logos/s/6/svelte.svg)

<!-- Svelte is a modern front-end framework for building user interfaces. Unlike traditional frameworks like React or Vue, Svelte shifts the work from the browser to the build step, compiling your code into efficient, imperative code that directly manipulates the DOM. -->

<!-- This results in faster initial load times, smooth animations, and less client-side computation. Svelte applications are written in a superset of HTML, where you can include JavaScript and CSS directly in your markup. -->

<!-- SvelteKit is a framework built around Svelte, providing features like server-side rendering (SSR) and static site generation (SSG). It's designed to make building Svelte applications even easier and more flexible. -->

## Svelte's Unique Approach

```html
<script lang="js">
  let name = 'Svelte';
</script>

<h1>Hello {name.toUpperCase()}!</h1>

<style>
  h1 {
    font-size: 2rem;
  }
</style>
```

<!-- Svelte's unique approach to building web applications sets it apart from other frameworks. Instead of using a virtual DOM, Svelte writes code that surgically updates the DOM when the state of your app changes. This results in a highly efficient update process that can significantly improve the performance of your application. -->

## Reactive Declarations

```javascript
let count = $state(0);

// This block runs whenever the value of count changes
let doubled = $derived(count * 2);
```

<!-- One of the key features of Svelte is its use of reactive declarations. This means that you can write code that automatically updates whenever your app's state changes. This makes it easier to manage complex state logic and ensures that your UI is always in sync with your underlying data. -->

## SvelteKit: The Full Package

```javascript
import { goto } from '$app/navigation';

// Navigate to a new page
goto('/new-page');
```

<!-- While Svelte provides a powerful way to build individual components, SvelteKit provides a full framework for building complete web applications. It includes features like routing, server-side rendering, and static site generation out of the box. This means you can focus on building your application, without having to worry about setting up these common features. -->

# Discuss the Svelte ecosystem and community

## Svelte Ecosystem and Community

```javascript
import { writable } from 'svelte/store';

// Create a writable store
const count = writable(0);
```

<!-- The Svelte ecosystem is rich and growing, with a number of libraries and tools designed to work seamlessly with Svelte. These include state management libraries like `svelte/store`, animation libraries like `svelte/motion`, and even a full-featured UI library, `svelte/material-ui`. -->

# Compare Svelte with other popular frameworks

<!-- When comparing Svelte to other popular frameworks like React and Vue, there are several key differences to consider. -->

### React

<!-- React uses a virtual DOM to track changes in the state of an application. When a change occurs, React re-renders the virtual DOM and then updates the actual DOM to match. This can lead to unnecessary computation and slower performance in some cases. -->

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

### Vue

```html
<template>
  <div>
    <p>You clicked {{ count }} times</p>
    <button @click="count++">Click me</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0,
      };
    },
  };
</script>
```

<!-- Vue, like React, also uses a virtual DOM. However, Vue introduces a more intuitive syntax for handling reactivity and state management. -->

### Svelte

```html
<script>
  let count = 0;
</script>

<p>You clicked {count} times</p>
<button on:click={() => count += 1}>
  Click me
</button>
```

<!-- In contrast, Svelte compiles your code to efficient, imperative code that directly manipulates the DOM. This results in faster initial load times and less client-side computation. -->

#### Svelte 5

```html
<script>
  let count = $state(0);
</script>

<p>You clicked {count} times</p>
<button onclick={() => count += 1}>
  Click me
</button>
```

<!-- Svelte 5 will introduce runes, which are symbols that influence the Svelte compiler. Whereas Svelte today uses `let`, `=`, the `export` keyword and the `$:` label to mean specific things, runes use function syntax to achieve the same things and more. The reality is that as applications grow in complexity, figuring out which values are reactive and which aren't can get tricky. -->

# Provide examples of real-world applications built with Svelte and SvelteKit

1. [**Roam Research**](<https://roamresearch.com/>)
2. [**GraphCDN**](<https://graphcdn.io/>)
3. [**Spectrum.chat**](<https://spectrum.chat/>)
4. [**plausible.io**](<https://plausible.io/>)
5. [**Supabase**](<https://supabase.io/>)

<!-- **Roam Research** (<https://roamresearch.com/>) - Roam Research, a popular note-taking application, uses Svelte for its front-end to provide an interactive and responsive user interface. -->

<!-- **GraphCDN** (<https://graphcdn.io/>) - GraphCDN, a content delivery network for GraphQL APIs, is built with Svelte and SvelteKit. It offers a developer-friendly interface to cache and optimize GraphQL responses. -->

<!-- **Spectrum.chat** (<https://spectrum.chat/>) - Spectrum, a community platform for discussions, leverages Svelte and SvelteKit for its client-side rendering and seamless user interactions. -->

<!-- **plausible.io** (<https://plausible.io/>) - Plausible Analytics, an open-source privacy-focused web analytics platform, utilizes Svelte and SvelteKit to provide an efficient and customizable analytics dashboard. -->

<!-- **Supabase** (<https://supabase.io/>) - Supabase, an open-source Firebase alternative, utilizes Svelte and SvelteKit in its administrative dashboard to provide real-time database and authentication functionality. -->

<!-- These are just a few examples, but there are many more applications being built with Svelte and SvelteKit across various domains. -->

# Discuss how to set up a new Svelte or SvelteKit project

## JavaScript Runtime

- [NodeJS](https://nodejs.org/en)
- [Bun](https://bun.sh)
- [Deno](https://deno.com)

## Package Managers

- [NPM](https://www.npmjs.com)
- [PNPM](https://pnpm.io)
- [Yarn](https://yarnpkg.com)

## Create a new Sveltekit project

```bash
npx sv create my-app
cd my-app
npm run dev
```

# Introduce the basic syntax and concepts of Svelte and SvelteKit

## Basic Syntax & Concepts of Svelte

```html
<!-- Svelte component -->
<script>
  let count = $state(0);
</script>

<p>You clicked {count} times</p>
<button onclick={() => count += 1}>
  Click me
</button>
```

<!-- Svelte components are written in .svelte files, which contain HTML, CSS, and JavaScript. -->

### CSS

```html
<style>
  p {
    color: blue;
  }
</style>

<p>This text will be blue</p>
```

<!-- CSS in Svelte is scoped to the component. This means that styles declared in a component will not affect other components. -->

### JavaScript

```html
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<p>{count} doubled is {doubled}</p>
```

<!-- JavaScript in Svelte is written inside a `<script>` tag at the top of the .svelte file. -->

## Routing

```bash
src/routes
├── +page.svelte
├── about/
└──── +page.svelte
```

<!-- SvelteKit uses a filesystem-based router. This means that the structure of the src/routes directory determines the routes of your application. -->

<!-- In this example, you would have two routes: `/` and `/about`. More on this later. -->

# Introduce modern database options

<!-- When it comes to choosing a database for your application, there are several modern options to consider. In this section, we will introduce and compare three popular choices: Supabase, Firestore, and traditional MySQL databases. -->

## Firestore

| Pros               | Cons                          |
| --- | --- |
| real-time updates  | 💸 costs can rise quickly     |
| offline support    | complex queries are difficult |
| scalable           |
| strong integration |

<!-- Firestore is a NoSQL document database built for automatic scaling, high performance, and ease of application development. It's part of the Google Firebase platform. -->

## Supabase

| Pros                         | Cons                           |
| --- | --- |
| real-time capabilities       | smaller community              |
| built-in user authentication | fewer third-party integrations |
| scalability                  |
| open-source                  |

<!-- Supabase is an open-source Firebase alternative. It provides a suite of tools including a Postgres database, authentication and storage handling, real-time subscriptions, and more. -->

## MySQL

| Pros                                | Cons                    |
| --- | --- |
| wide usage                          | setup & maintenance     |
| large community                     | lacks modern features   |
| powerful querying                   | scalability challenging |
| transaction support                 |
| good performance on large databases |
