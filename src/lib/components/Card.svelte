<script lang="js">
    let { link, image, name } = $props();
</script>

<a href="{link}">
    <img src="/images/{image}" alt="{name}"/>
    <p>{name}</p>
</a>