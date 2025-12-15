<script lang="js">
	import PriceChip from "./PriceChip.svelte";

    // define variables
    /** @type {{ link: string, image: string, name: string, count: number, price: number, description: string, id: number }} */
    let { link, image, name, count, price, description, id } = $props();
</script>

<div class="cart-item">
    <div class="item-details">
        <div class="pixel-corners--wrapper">
            <img src="/images/{image}" alt="" class="pixel-corners" />
        </div>
        <div class="item-text-background pixel-corners-2-rad8">
            <div class="item-text">
                <div class="item-top">
                    <div class="item-text-main">
                        <a href="/products/{link}"><h2>{name}</h2></a>
                        <div class="item-quantity">
                            <p>{count} × </p>
                            <PriceChip price={price} />
                        </div>
                    </div>
                    <button class="remove pixel-corners-2-rad4" onclick={() => cart.remove(id)}>
                        Remove
                    </button>
                </div>
                <hr class="product-separator">
                <p>{description}</p>
                <div class="item-subtotal">
                    <p>You pay: </p>
                    <PriceChip price={count * price} />
                </div>
            </div>
        </div>
    </div>
</div>