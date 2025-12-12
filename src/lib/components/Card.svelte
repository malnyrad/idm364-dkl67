<script lang="js">
    let { link, image, name, element } = $props();

    // import components
    import ElementChip from "./ElementChip.svelte";
</script>

<a href="/products/{link}">
    <div class="card">
        <img src="/images/{image}" alt="{name}"/>
        <h2>{name}</h2>
        <ElementChip element="{element}" />
    </div>
</a>