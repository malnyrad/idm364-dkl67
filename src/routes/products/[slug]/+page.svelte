<script lang="js">
	// import components
	import Header from '$lib/components/Header.svelte';
	import ElementChip from '$lib/components/ElementChip.svelte';
	import PriceChip from '$lib/components/PriceChip.svelte';
	import QuantityCounter from '$lib/components/QuantityCounter.svelte';
	import AddToCartButton from '$lib/components/AddToCartButton.svelte';

	// define variables
	let { data } = $props();
</script>

<Header />
<div class="container-outer">
	<div class="product">
			<img src="/images/{data.product.image}" alt="{data.product.name}" class="product-image"/>
		<div class="product-details">
			<h1>{data.product.name}</h1>
			<ElementChip element={data.product.element} />
			<hr class="product-separator">
			<div class="product-quantity">
				<QuantityCounter id={data.product.id} />
				<PriceChip price={data.product.price} />
			</div>
			<p>{data.product.description}</p>
			<AddToCartButton product={data.product} />
		</div>
	</div>
</div>