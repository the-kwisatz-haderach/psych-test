<script lang="ts">
	import { Drawer, Button, CloseButton, Heading } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	export let buttonLabel = '';
	export let title = '';
	export let hidden = true;
	export let placement: 'right' | 'left' = 'right';

	export let onClick = (open: boolean) => (hidden = open);

	const transitionParams = {
		x: 320 * (placement === 'right' ? 1 : -1),
		duration: 200,
		easing: sineIn
	};
</script>

<slot name="button">
	<Button on:click={() => onClick(false)}>{buttonLabel}</Button>
</slot>

<Drawer {placement} transitionType="fly" {transitionParams} bind:hidden>
	<div class="mb-4 flex">
		<Heading tag="h5" class="inline-flex items-center text-lg font-semibold">
			{title}
		</Heading>
		<CloseButton on:click={() => onClick(true)} />
	</div>
	<div>
		<slot />
	</div>
</Drawer>
