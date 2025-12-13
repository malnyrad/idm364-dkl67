<script lang="js">
    // import components
    import Header from '$lib/components/Header.svelte';
    import QuantityCounter from '$lib/components/QuantityCounter.svelte';
    import { cart } from '$lib/cart.js';

    // define variables
    let { data, count } = $props()
    $inspect(data)
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