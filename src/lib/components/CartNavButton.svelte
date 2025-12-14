<script lang="js">
    // import components
    import { cartCount } from "$lib/cart";
</script>

<a href="/cart" class="cart">
    Basket
    {#if $cartCount > 0}
        ({$cartCount})
    {/if}
</a>