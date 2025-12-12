<script lang="ts">
	let { data } = $props();

	// import components
	import Header from '$lib/components/Header.svelte';
	import ElementChip from '$lib/components/ElementChip.svelte';
	import PriceChip from '$lib/components/PriceChip.svelte';
	import QuantityCounter from '$lib/components/QuantityCounter.svelte';
</script>


<Header />
<div class="container-outer">
	<div class="product">
		<div class="product-image">
			<img src="/images/{data.product.image}" alt="{data.product.name}" />
		</div>
		<div class="product-details">
			<h1>{data.product.name}</h1>
			<ElementChip element={data.product.element} />
			<hr>
			<div class="product-quantity">
				<QuantityCounter />
				<PriceChip price={data.product.price} />
			</div>
			<p>{data.product.description}</p>
		</div>
	</div>
</div>