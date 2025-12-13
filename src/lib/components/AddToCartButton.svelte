<script lang="js">
    // import components
    import { count } from '$lib/stores.js';
    import { cart } from '$lib/cart.js';

    // define variables
    /** @type {{ id: number, name: string, price: number, image: string }} */
    let { product } = $props();
    let { id, name, price, image } = product;
    let calculatedPrice = $derived(price * $count);

    // define functions
    function add_to_cart() {
	    cart.add(product);
    }
</script>

<button onclick={add_to_cart} >
    Buy {$count}<br>
    <img src="/images/coin.webp" alt="" /> {calculatedPrice}
</button>