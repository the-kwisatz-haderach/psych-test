<script lang="ts">
	import type { Item } from '$lib/tests';
	import { Card, Heading, P, A } from 'flowbite-svelte';
	export let items: Item[] = [];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
	{#each items as item}
		<Card size="xl">
			<Heading class="leading-relaxed" tag="h3">{item.title}</Heading>
			<P class="mb-4">{item.description}</P>
			<A class="justify-end flex-1" href={item.href}>Read more</A>
		</Card>
	{/each}
</div>
