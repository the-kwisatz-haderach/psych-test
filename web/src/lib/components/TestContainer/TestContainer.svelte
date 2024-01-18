<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import CloseIcon from 'flowbite-svelte-icons/CloseSolid.svelte';

	export let open = false;
	export let onClose: () => void = () => {};
	const onClick = () => {
		onClose();
		open = false;
	};
</script>

{#if open}
	<div class="fixed inset-0 z-10 h-screen w-screen bg-white">
		<div class="flex h-full w-full flex-col p-4">
			<Button class="w-fit self-end" on:click={onClick}><CloseIcon /></Button>
			<div class="container mx-auto flex flex-1 items-center justify-center">
				<slot />
			</div>
		</div>
	</div>
{/if}
