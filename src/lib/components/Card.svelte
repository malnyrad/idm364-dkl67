<script lang="js">
    // import components
    import ElementChip from "./ElementChip.svelte";
    import PriceChip from "./PriceChip.svelte";

    // define variables
    /** @type {{ link: string, image: string, name: string, element: string, price: number }} */
    let { link, image, name, element, price } = $props();
</script>

<a href="/products/{link}">
    <div class="card">
        <img src="/images/{image}" alt="{name}" />
        <h2>{name}</h2>
        <ElementChip element={element} />
        <PriceChip price={price} />
    </div>
</a>