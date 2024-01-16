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
				.map((p, i, arr) => ({
					title: p.replace('-', ' '),
					href: '/' + arr.slice(0, i + 1).join('/')
				}))
		];
	};
</script>

<Breadcrumb aria-label="breadcrumbs" navClass="flex h-6 container mx-auto my-4">
	{#each breadcrumbs as crumb}
		<BreadcrumbItem
			spanClass="ms-1 text-sm font-medium text-gray-500 md:ms-2 capitalize-first"
			linkClass="ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ms-2 capitalize-first"
			href={crumb.href === currentPath ? undefined : crumb.href}
			home={crumb.href === '/'}>{crumb.title}</BreadcrumbItem
		>
	{/each}
</Breadcrumb>
