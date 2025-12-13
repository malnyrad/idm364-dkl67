<script lang="js">
    import { count } from '$lib/stores.js';

    /** @type {{ price: number }} */
    let { price } = $props();

    let calculatedPrice = $derived(price * $count);
</script>

<button>
    Buy {$count}<br>
    <img src="/images/coin.webp" alt="" /> {calculatedPrice}
</button>