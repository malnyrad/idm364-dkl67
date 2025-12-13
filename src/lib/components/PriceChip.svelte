<script lang="js">
    /** @type {{ price: number }} */
    let { price } = $props();
</script>

<div class="price">
    <img src="/images/coin.webp" alt="" />
    <p>{price}</p>
</div>