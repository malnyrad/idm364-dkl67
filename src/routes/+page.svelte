<script lang="js">
    // HOME PAGE

    // import components
    import Header from '$lib/components/Header.svelte';
    import Card from '$lib/components/Card.svelte';

    // define variables
    let { data } = $props();
    $inspect(data);
</script>

<Header />
<div class="container-outer">
    <div class="container-inner">
        {#if data.products}
            {#each data.products as product}
                <Card link={product.slug} image={product.image} name={product.name} element={product.element} price={product.price} />
            {/each}
        {/if}
    </div>
</div>