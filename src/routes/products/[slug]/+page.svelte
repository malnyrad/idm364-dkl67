<script lang="js">
	// PRODUCT PAGE

	// import components
  	import { cart } from '$lib/cart.js';
	import { get_quantity_store, reset_quantity } from '$lib/quantity.js';
	import Header from '$lib/components/Header.svelte';
	import ElementChip from '$lib/components/ElementChip.svelte';
	import PriceChip from '$lib/components/PriceChip.svelte';
	import QuantityCounter from '$lib/components/QuantityCounter.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// define variables
	let { data } = $props();
	const product = data.product;
  	const quantity = get_quantity_store(product.id);

	// declare functions
	function add_to_cart() {
    	cart.add(product, $quantity);
		// reset after adding to cart
    	reset_quantity(product.id);
	}
</script>

<Header />
<div class="product-outer">
	<div class="product-inner ">
		<div class="pixel-corners--wrapper">
			<img src="/images/{product.image}" alt="{product.name}" class="product-image pixel-corners"/>
		</div>
		<div class="product-details">
			<h1>{product.name}</h1>
			<ElementChip element={product.element} />
			<hr class="product-separator">
			<p>{product.description}</p>
			<PriceChip price={product.price} />
			<div class="product-quantity">
				<QuantityCounter product_id={product.id} />
				<button class="pixel-corners-2-rad4" onclick={add_to_cart}>
					Put {$quantity} in basket
				</button>
			</div>
		</div>
	</div>
</div>
<Footer />