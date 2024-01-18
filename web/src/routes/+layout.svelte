<script>
	import '../app.scss';
	import Breadcrumbs from '$lib/components/Breadcrumbs/Breadcrumbs.svelte';
	import NavMenu from '$lib/components/NavMenu/NavMenu.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	export let data;
</script>

<svelte:head>
	<title>Psych Out</title>
</svelte:head>
<NavMenu user={data} />
<Breadcrumbs />
<main class="container mx-auto px-4 pb-8 pt-4 sm:px-0">
	<slot />
</main>
<Footer />
