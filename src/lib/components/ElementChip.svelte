<script lang="js">
    let { element } = $props();
</script>

{#if element === "Earth"}
    <div class="element" style="background-color: #956127">
        <img src="/images/earth.webp" alt="" />
        <p>{element}</p>
    </div>
{:else if element === "Fire"}
    <div class="element" style="background-color: #c71f1b;">
        <img src="/images/fire.webp" alt="" />
        <p>{element}</p>
    </div>
{:else if element === "Water"}
    <div class="element" style="background-color: #4e73eb;">
        <img src="/images/water.webp" alt="" />
        <p>{element}</p>
    </div>
{:else if element === "Wind"}
    <div class="element" style="background-color: #35a560">
        <img src="/images/wind.webp" alt="" />
        <p>{element}</p>
    </div>
{:else}
    <p>Error</p>
{/if}