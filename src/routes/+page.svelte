<script lang="js">
    let {data} = $props()
    $inspect(data)
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>Hello and welcome to my site!</h1>
<a href="/product">Buy an item</a>

{#if data.products}
    {#each data.products as product}
        <p>{product.name}</p>
    {/each}
{/if}