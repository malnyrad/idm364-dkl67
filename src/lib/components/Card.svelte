<script lang="js">
    let { link, image, name } = $props();
</script>

<a href="/products/{link}">
    <div class="card">
        <img src="/images/{image}" alt="{name}"/>
        <p>{name}</p>
    </div>
</a>