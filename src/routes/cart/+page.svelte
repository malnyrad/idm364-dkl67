<script lang="js">
	// CART PAGE

    // import components
    import Header from '$lib/components/Header.svelte';
	import { cart } from '$lib/cart.js';
	import { cartTotal } from '$lib/cart.js';

    // define variables
    let { data } = $props();
    $inspect(data);
</script>

<Header />
{#if $cart.length === 0}
	<p>Cart is empty</p>
{:else}
	{#each $cart as item}
		<div>
			<strong>{item.name}</strong><br />
			Qty: {item.count}<br />
			${item.price} each<br />
			Total: ${item.count * item.price}
		</div>
	{/each}
{/if}
<div class="total">
	<h2>Grand Total</h2>
	<div class="total-price">
		<img src="/images/coin.webp" alt="" />
		<p>{$cartTotal}</p>
	</div>
</div>