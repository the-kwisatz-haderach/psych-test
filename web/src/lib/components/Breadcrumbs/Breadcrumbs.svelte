<script lang="ts">
	import { page } from '$app/stores';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	type Breadcrumb = { title: string; href: string };

	$: currentPath = $page.url.pathname;
	$: breadcrumbs = generateCrumbs($page.url.pathname, $page.status);

	const generateCrumbs = (pathname: string, status = 200): Breadcrumb[] => {
		const crumbs: Breadcrumb[] = [{ title: 'Home', href: '/' }];
		if (pathname === '/') {
			return crumbs;
		}
		if (status !== 200) {
			return [...crumbs, { title: '404', href: '' }];
		}
		return [
			...crumbs,
			...pathname
				.slice(1)
				.split('/')
				.map((path, i, arr) => ({
					title: path,
					href: '/' + arr.slice(0, i + 1).join('/')
				}))
		];
	};
</script>

<Breadcrumb aria-label="breadcrumbs">
	{#each breadcrumbs as crumb}
		<BreadcrumbItem
			href={crumb.href === currentPath ? undefined : crumb.href}
			home={crumb.href === '/'}>{crumb.title}</BreadcrumbItem
		>
	{/each}
</Breadcrumb>
