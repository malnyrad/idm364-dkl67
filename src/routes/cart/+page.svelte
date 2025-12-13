<script>
    let { data, count } = $props()
    $inspect(data)

    // import components
    import Header from '$lib/components/Header.svelte';
    import QuantityCounter from '$lib/components/QuantityCounter.svelte';
</script>

{#each data.products as product}
<div>
    <p>{product.name}</p>
    <QuantityCounter id={product.id} />
    </div>
{/each}