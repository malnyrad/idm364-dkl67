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
<h1>Your Items</h1>
<button class="remove" onclick={() => cart.remove_all()}>
	Remove all items
</button>
{#if $cart.length === 0}
	<p>Your basket is empty. Why not <a href="/">browse our wares?</a></p>
{:else}
	{#each $cart as item}
		<div class="cart-item">
			<div class="item-details">
				<img src="/images/{item.image}" alt="" />
				<div class="item-text">
					<h2>{item.name}</h2>
					<div class="item-quantity">
						<p>{item.count} × </p>
						<img src="/images/coin.webp" alt="" />
						<p>{item.price}</p>
					</div>
					<div class="item-subtotal">
						<img src="/images/coin.webp" alt="" />
						<p>{item.count * item.price}</p>
					</div>
				</div>
			</div>
			<button class="remove" onclick={() => cart.remove(item.id)}>
				Remove
			</button>
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