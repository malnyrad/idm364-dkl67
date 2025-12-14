<script lang="js">
	import { get_quantity_store } from '$lib/quantity.js';

	export let product_id;
	
    const count = get_quantity_store(product_id);

	function increment() {
		count.update(n => n + 1);
	}

	function decrement() {
		count.update(n => Math.max(1, n - 1));
	}
</script>

<button onclick={increment}>+</button>
<p>{$count}</p>
<button onclick={decrement}>-</button>