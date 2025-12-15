<script lang="js">
	// CART PAGE

    // import components
	import { cart } from '$lib/cart.js';
	import { cartTotal } from '$lib/cart.js';
    import Header from '$lib/components/Header.svelte';
	import CartItem from '$lib/components/CartItem.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PriceChip from '$lib/components/PriceChip.svelte';

    // define variables
    let { data } = $props();
    $inspect(data);
</script>

<Header />
<div class="cart-outer">
	<div class="cart-inner">
		<div class="cart-header">
			<h1>Your Items</h1>
			<button class="remove pixel-corners-2-rad4" onclick={() => cart.remove_all()}>
				Remove all items
			</button>
		</div>
		{#if $cart.length === 0}
			<p>Your basket is empty. Why not <a href="/">browse our wares?</a></p>
		{:else}
			{#each $cart as item}
				<CartItem link={item.slug} image={item.image} name={item.name} count={item.count} price={item.price} description={item.description} id={item.id} />
			{/each}
		{/if}
		<div class="total">
			<h2>Grand Total</h2>
			<PriceChip price={$cartTotal} />
		</div>
	</div>
</div>
<Footer />