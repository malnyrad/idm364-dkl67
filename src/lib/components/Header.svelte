<script lang="js">
    // import components
    import CartNavButton from './CartNavButton.svelte';
</script>

<header>
    <nav>
        <a href="/">
            <div class="logo">
                <img src="/images/favicon.webp" alt="" />
                <h1>Moonbury Sundries</h1>
            </div>
        </a>
        <div class="links">
            <a href="/">Home</a>
            <CartNavButton />
        </div>
    </nav>
</header>