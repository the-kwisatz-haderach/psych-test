<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	export let title = '';
	export let description = '';
</script>

<header class="mb-8">
	<Heading class="leading-relaxed">{title}</Heading>
	<P>
		{description}
	</P>
</header>
