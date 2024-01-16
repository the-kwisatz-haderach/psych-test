<script lang="ts">
	import { Heading, P, A } from 'flowbite-svelte';
	import CardGrid from '$lib/components/CardGrid/CardGrid.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import LinkIcon from 'flowbite-svelte-icons/ChevronRightSolid.svelte';
	import { tests } from '$lib/tests';
</script>

<Header
	title="Heading"
	description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla rem natus veritatis iusto dolor aut quidem exercitationem. Nemo, perspiciatis."
/>
<section>
	<header class="flex justify-between items-end mb-6">
		<Heading class="w-fit" tag="h2">Tests</Heading>
		<A aClass="inline-flex items-center font-medium hover:underline" href="/tests"
			>View all <LinkIcon size="xs" class="ms-2" /></A
		>
	</header>
	<CardGrid items={tests} />
</section>
