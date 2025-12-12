<script lang="js">
    let { element } = $props();
</script>

<div class="element">
    {#if element === "Earth"}
        <p>Earth</p>
    {:else if element === "Fire"}
        <p>Fire</p>
    {:else if element === "Water"}
        <p>Water</p>
    {:else if element === "Wind"}
        <p>Wind</p>
    {:else}
        <p>Error</p>
    {/if}
</div>