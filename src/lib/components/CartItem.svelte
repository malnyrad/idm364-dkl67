<script lang="js">
	import PriceChip from "./PriceChip.svelte";

    // define variables
    /** @type {{ image: string, name: string, count: number, price: number, id: number }} */
    let { image, name, count, price, id } = $props();
</script>

<div class="cart-item">
    <div class="item-details">
        <img src="/images/{image}" alt="" />
        <div class="item-text">
            <div class="item-text-main">
                <h2>{name}</h2>
                <div class="item-quantity">
                    <p>{count} × </p>
                    <PriceChip price={price} />
                </div>
            </div>
            <div class="item-subtotal">
                <p>You pay: </p>
                <PriceChip price={count * price} />
            </div>
        </div>
    </div>
    <button class="remove" onclick={() => cart.remove(id)}>
        Remove
    </button>
</div>