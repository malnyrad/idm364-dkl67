<script lang="js">
    // import components
	import { get_quantity_store } from '$lib/quantity.js';

	// export components
    export let product_id;
	
    // define variables
    const count = get_quantity_store(product_id);

    // declare functions
	function increment() {
		count.update((n) => n + 1);
	}

	function decrement() {
		count.update((n) => Math.max(1, n - 1));
	}
</script>

<button onclick={increment}>+</button>
<p>{$count}</p>
<button onclick={decrement}>-</button>