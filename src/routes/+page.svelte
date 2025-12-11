<script lang="js">
    let { data } = $props()
    $inspect(data)

    import Card from '$lib/components/Card.svelte';
</script>

<h1>Hello and welcome to my site!</h1>

{#if data.products}
    {#each data.products as product}
        <Card link="{product.slug}" image="{product.image}" name="{product.name}" />
    {/each}
{/if}