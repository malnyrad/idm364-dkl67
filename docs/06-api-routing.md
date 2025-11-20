# Sveltekit API Routing

- [Sveltekit API Routing](#sveltekit-api-routing)
  - [Project setup](#project-setup)
  - [Using an API](#using-an-api)
    - [Create `+layout.svelte`](#create-layoutsvelte)
    - [Create `+page.svelte`](#create-pagesvelte)
    - [Create blog layout script file](#create-blog-layout-script-file)
    - [Create blog layout](#create-blog-layout)
    - [Create blog page script](#create-blog-page-script)
    - [Create blog page route](#create-blog-page-route)
  - [Building API routes](#building-api-routes)
    - [Create message API](#create-message-api)
    - [Create random number API](#create-random-number-api)
    - [Create posts API](#create-posts-api)
    - [Create add API and page route](#create-add-api-and-page-route)

## Project setup

```bash
touch src/routes/+layout.svelte
mkdir src/routes/blog
touch src/routes/blog/+layout.svelte
touch src/routes/blog/+layout.js
touch src/routes/blog/+page.svelte
touch src/routes/blog/+page.js
```

## Using an API

### Create `+layout.svelte`

```svelte
<script lang="js">
	import { resolve } from '$app/paths'
	import favicon from '$lib/assets/favicon.svg'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<ul>
		<li><a href={resolve('/')}>Home</a></li>
		<li><a href={resolve('/blog')}>Blog Homepage</a></li>
	</ul>
</nav>

{@render children()}

<style>
  nav {
    background: lightblue;
    margin-block-end: 1rem;
    padding: 0.5rem;
  }

  ul {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0;
  }

  a {
    display: block;
    font-size: 200%;
    padding: 0.5rem 1.5rem;
  }

  a:hover {
    background-color: cornsilk;
  }
</style>
```

### Create `+page.svelte`

```svelte
<h1>My homepage</h1>
```

### Create blog layout script file

```javascript
// src/routes/blog/+layout.js
export async function load() {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments/');
  const data = await res.json();

  if (res.ok) {
    return {
      comments: data,
    };
  } else {
    return {
      status: res.status,
      error: new Error('Could not load comments'),
    };
  }
}
```

### Create blog layout

```svelte
<!-- src/routes/blog/+layout.svelte -->
<script lang="js">
	let { data, children } = $props()

	const post_limit = 5
</script>

<main>
	{@render children()}
	<section>
		<h2>Comments</h2>
		<div class="grid">
			{#each data.comments.slice(0, post_limit) as comment (comment.id)}
				<div>
					<p class="comment-name">{comment.name}</p>
					<p>{comment.body}</p>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
  section {
    background-color: skyblue;
    margin-block-start: 1rem;
    padding: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 1rem;
  }

  .grid > div {
    background-color: #efefef;
    border: 1px solid skyblue;
    padding-inline: 8px;
  }

  .comment-name {
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>
```

### Create blog page script

```javascript
// src/routes/blog/+page.js
export async function load() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
  const data = await res.json();

  if (res.ok) {
    return {
      posts: data,
    };
  } else {
    return {
      status: res.status,
      error: new Error('Could not load blog posts'),
    };
  }
}
```

### Create blog page route

```svelte
<!-- src/routes/blog/+page.svelte -->
<script>
	let { data } = $props()
</script>

<div class="grid">
	{#each data.posts as post (post.id)}
		<article>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</article>
	{/each}
</div>

<style>
	.grid {
		background-color: orangered;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		padding: 1rem;
	}

	article {
		background-color: #fafafa;
		padding-inline: 8px;
	}
</style>
```

## Building API routes

### Create message API

```javascript
// src/routes/api/message/+server.js
export async function GET(request) {
  return new Response('hello world');
}

// http://localhost:5173/api/message
```

### Create random number API

```javascript
// src/routes/api/random-number/+server.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const min = Number(url.searchParams.get('min') ?? '0');
  const max = Number(url.searchParams.get('max') ?? '1');

  const d = max - min;

  if (isNaN(d) || d < 0) {
    throw error(
      400,
      'min and max must be numbers, and min must be less than max'
    );
  }

  const random = min + Math.random() * d;

  return new Response(String(random));
}

// http://localhost:5173/api/random-number
// http://localhost:5173/api/random-number?min=5&max=100
```

### Create posts API

```javascript
// src/routes/api/posts/+server.js
import { json } from '@sveltejs/kit';

export async function GET() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const data = await res.json();

  if (res.ok) {
    // return new Response(JSON.stringify(data));
    return json(data);
  } else {
    return {
      status: res.status,
      error: new Error(`Could not load blog posts`),
    };
  }
}

// http://localhost:5173/api/posts
```

### Create add API and page route

```javascript
// src/routes/api/add/+server.js
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { a, b } = await request.json();
  return json(a + b);
}
```

To test, send a POST request with an object to the route with the properties `a` and `b`.

- http://localhost:5173/api/add

```json
{
  "a": 5,
  "b": 10
}
```

```svelte
<!-- src/routes/api/add/+page.svelte -->
<script lang="js">
	let a = $state(0)
	let b = $state(0)
	let total = $state(0)

	async function add() {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ a, b }),
			headers: {
				'content-type': 'application/json'
			}
		})

		total = await response.json()
	}
</script>

<section>
	<div>
		<div>
			<input type="number" bind:value={a} /> +
			<input type="number" bind:value={b} /> =
			{total}
		</div>
		<div class="form-control">
			<button onclick={add}>Calculate</button>
		</div>
	</div>
</section>

<style>
	section {
		align-items: center;
		display: flex;
		height: 100dvh;
		justify-content: center;
		scale: 3;
		width: 100%;
	}

	.form-control {
		margin-block-start: 1.5rem;
		text-align: center;
	}
</style>
```
