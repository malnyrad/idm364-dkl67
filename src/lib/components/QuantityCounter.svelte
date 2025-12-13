<script>
  import { count } from '$lib/stores.js';

  function increment() {
    count.update((n) => n + 1);
  }

  function decrement() {
    count.update((n) => Math.max(1, n - 1));
  }
</script>

<button on:click="{increment}">+</button>
<p>{$count}</p>
<button on:click="{decrement}">-</button>