<script lang="ts">
	let { data } = $props();
</script>

<h1>{data.product.name}</h1>
<img src="/images/{data.product.image}" alt="{data.product.name}"/>
<p>{data.product.element}</p>
<p>{data.product.price}</p>
<p>{data.product.description}</p>