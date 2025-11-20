# Loading Data

## Setup primary layout 

```svelte 
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths'
	import favicon from '$lib/assets/favicon.svg'
	import '$lib/screen.css'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<ul>
		<li><a href={resolve('/')}>Home</a></li>
		<li><a href={resolve('/teams')}>Teams</a></li>
	</ul>
</nav>
{@render children?.()}
```

## Create sample data

```javascript
// src/lib/data.js
export const teams = [
  { name: 'Thunder Scorpions', city: 'Chicago', mascot: 'Sting', record: '15-5' },
  { name: 'Forest Hawks', city: 'San Francisco', mascot: 'Flapper', record: '12-8' },
  { name: 'Marine Sharks', city: 'Miami', mascot: 'Finn', record: '10-10' },
  { name: 'Mountain Lions', city: 'Denver', mascot: 'Roary', record: '20-0' },
  { name: 'Desert Camels', city: 'Las Vegas', mascot: 'Humpy', record: '8-12' },
  { name: 'Sky Eagles', city: 'New York', mascot: 'Soarer', record: '14-6' },
  { name: 'Snowy Owls', city: 'Anchorage', mascot: 'Hooter', record: '16-4' },
  { name: 'River Ducks', city: 'Portland', mascot: 'Quacky', record: '11-9' },
  { name: 'Grassland Buffaloes', city: 'Omaha', mascot: 'Stompy', record: '18-2' },
  { name: 'Sunny Palms', city: 'Los Angeles', mascot: 'Shady', record: '10-10' },
  { name: 'Beach Dolphins', city: 'San Diego', mascot: 'Flipper', record: '13-7' },
  { name: 'Urban Rats', city: 'Philadelphia', mascot: 'Squeaky', record: '17-3' },
  { name: 'Molten Lava', city: 'Phoenix', mascot: 'Fuego', record: '6-14' },
  { name: 'Icebergs Penguins', city: 'Milwaukee', mascot: 'Chilly', record: '18-2' },
  { name: 'Cotton Crows', city: 'Houston', mascot: 'Crowie', record: '9-11' },
  { name: 'Golden Eagles', city: 'Detroit', mascot: 'Goldie', record: '16-4' },
  { name: 'Cosmic Comets', city: 'Orlando', mascot: 'Starry', record: '14-6' },
  { name: 'Falling Leaves', city: 'Seattle', mascot: 'Rusty', record: '12-8' },
  { name: 'Tropical Pelicans', city: 'Tampa', mascot: 'Petey', record: '15-5' },
  { name: 'Dusty Coyotes', city: 'Austin', mascot: 'Howler', record: '13-7' }
];
```

## Create `utils.js`

```javascript
// src/lib/utils.js
/**
 * A function that converts a string into a slug.
 * @param {string} str - String being converted to slug
 * @returns {string}
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
```

## Load Page Data

### Setup `teams` directory

```bash
mkdir src/routes/teams;
touch src/routes/teams/+layout.server.js;
touch src/routes/teams/+page.svelte;
```

### Setup `teams/+layout.server.js`

```javascript
import { slugify } from '$lib/utils';
import { teams } from '$lib/data';

/**
 * The load function iterates over the `teams` array and returns an object.
 * Each object in the array 'mascots' has 'name' and 'mascot' properties.
 * The value for the 'name' and 'mascot' keys are derived from the corresponding properties of each 'team' object.
 *
 * @module {Function} load
 * @returns {{teams: {name: string, mascot: string, slug: string}[]}} - An object with teams array
 */
export function load() {
  return {
    teams: teams.map((team) => ({
      name: team.name,
      mascot: team.mascot,
      slug: slugify(team.name),
      city: team.city,
      record: team.record
    }))
  };
}
```

### Setup `teams/+page.svelte`

```html
<!-- src/routes/teams/+page.svelte -->
<script lang="js">
    import { resolve } from '$app/paths'

    const { data } = $props();
</script>

<h1>Teams</h1>
<p>Select a team for more details.</p>
<ul>
	{#each data.teams as { name, slug } (slug)}
        <li>
            <a href={resolve(`/teams/${slug}`)}>{name}</a>
        </li>
  {/each}
</ul>
```

### Setup `[slug]` directory

```sh
mkdir src/routes/teams/\[slug];
touch src/routes/teams/\[slug]/+page.server.js;
touch src/routes/teams/\[slug]/+page.svelte;
```

### Setup `src/teams/[slug]/+page.server.js`

```javascript
// src/routes/[slug]/+page.server.js
import { error } from '@sveltejs/kit';
import { slugify } from '$lib/utils.js';
import { teams } from '$lib/data';

/**
 * Load a team based on the provided parameters.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.params - The parameters object.
 * @param {string} options.params.slug - The slug of the team to load.
 * @returns {Object} An object containing the team data.
 * @throws Will throw an error if the team is not found.
 */
export function load({ params }) {
  const team = teams.find((team) => slugify(team.name) === params.slug);

  if (!team) throw error(404);

  return {
    team
  };
}
```

### Setup `src/teams/[slug]/+page.svelte`

```html
<!-- src/routes/[slug]/+page.svelte -->
<script lang="js">
  /**
   * @typedef {Object} Team
   * @property {string} name - The name of the team.
   * @property {string} city - The city of the team.
   * @property {string} mascot - The mascot of the team.
   * @property {string} record - The record of the team.
   */

  /**
   * @typedef {Object} Data
   * @property {Team} team - The team data.
   */

  /** @type {Data} */
  const { data } = $props();
  const team = data.team;
</script>

<h1>{team.name} Team Data</h1>
<dl>
	<dt>City</dt>
	<dd>{team.city}</dd>
	<dt>Mascot</dt>
	<dd>{team.mascot}</dd>
	<dt>Record</dt>
	<dd>{team.record}</dd>
</dl>
```
```

### Create `teams/[slug]/+layout.svelte`

```bash
touch src/routes/teams/\[slug]/+layout.svelte
```

```html
<!-- src/routes/teams/[slug]/+layout.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths'

	let { data, children } = $props()
</script>

<div class="layout">
	<main>
		{@render children?.()}
	</main>
	<aside>
		<h2>Team List</h2>
		<ul>
			{#each data.teams as { slug, name } (slug)}
				<li>
					<a href={resolve(`/teams/${slug}`)}>{name}</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	.layout {
		outline: 1px solid var(--color-red-500);
	}
</style>
```

## Fix data reactivity

In SvelteKit, when you navigate between pages of the same type (like different [slug] routes), SvelteKit will reuse the existing page instance. This is a performance optimization, but it means that the load function in your route won't be called again, and the data prop won't be updated.

To ensure that the load function is called again when you navigate between different [slug] routes, you can use the page store provided by SvelteKit. The page store contains the current page's params, query, and path. You can reactively access the slug parameter from the page store and use it to fetch the appropriate data.

```diff
<!-- src/routes/teams/[slug]/+page.svelte -->
<script lang="js">
	import { page } from '$app/state'

	const { data } = $props()
-   const team = data.team;
+   let team = $derived(data.teams.find((t) => t.slug === page.params.slug))
</script>

{#if team}
  <h1>{team.name} Team Data</h1>
  <dl>
    <dt>City</dt>
    <dd>{team.city}</dd>
    <dt>Mascot</dt>
    <dd>{team.mascot}</dd>
    <dt>Record</dt>
    <dd>{team.record}</dd>
  </dl>
{:else}
  <p>No team found</p>
{/if}
```

### Refactor the `team` object

```javascript
// src/routes/teams/+layout.server.js
export function load() {
  return {
    teams: teams.map(({ city, mascot, name, record }) => ({
      city,
      mascot,
      name,
      record,
      slug: slugify(name),
    }))
  };
}
```
