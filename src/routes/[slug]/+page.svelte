<script lang="ts">
	//let { data } = $props();
    import { page } from '$app/state';

    const slug = page.params.slug;
</script>

<h1>Item: {slug}</h1>