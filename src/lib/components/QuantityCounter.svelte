<script lang="js">
    /** @type {{ id: number }} */
    let { data, id } = $props();

    import { count } from '$lib/stores';
</script>

<button onclick="{count.increment}">+</button>
<p>{$count}</p>
<button onclick="{count.decrement}">-</button>