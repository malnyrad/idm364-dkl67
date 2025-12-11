<script lang="js">
    let { link, image, name } = $props();
</script>

<a href="/products/{link}">
    <div class="card">
        <img src="/images/{image}" alt="{name}"/>
        <h2>{name}</h2>
    </div>
</a>