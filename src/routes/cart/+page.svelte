<script lang="js">
	// CART PAGE

    // import components
	import { cart } from '$lib/cart.js';
	import { cartTotal } from '$lib/cart.js';
    import Header from '$lib/components/Header.svelte';
	import CartItem from '$lib/components/CartItem.svelte';
	import Footer from '$lib/components/Footer.svelte';

    // define variables
    let { data } = $props();
    $inspect(data);
</script>

<Header />
<h1>Your Items</h1>
<button class="remove" onclick={() => cart.remove_all()}>
	Remove all items
</button>
{#if $cart.length === 0}
	<p>Your basket is empty. Why not <a href="/">browse our wares?</a></p>
{:else}
	{#each $cart as item}
		<CartItem image={item.image} name={item.name} count={item.count} price={item.price} id={item.id} />
	{/each}
{/if}
<div class="total">
	<h2>Grand Total</h2>
	<div class="total-price">
		<img src="/images/coin.webp" alt="" />
		<p>{$cartTotal}</p>
	</div>
</div>
<Footer />