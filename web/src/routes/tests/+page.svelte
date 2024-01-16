<script lang="ts">
	import CardGrid from '$lib/components/CardGrid/CardGrid.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import { tests } from '$lib/tests';
</script>

<Header
	title="Tests"
	description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni animi non labore consectetur exercitationem quam provident reprehenderit perferendis sint cupiditate?"
/>
<CardGrid items={tests} />
