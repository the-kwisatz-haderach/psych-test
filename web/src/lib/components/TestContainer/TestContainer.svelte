<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import CloseIcon from 'flowbite-svelte-icons/CloseSolid.svelte';

	export let open = false;
	const onClick = () => {
		open = false;
	};
</script>

{#if open}
	<div class="w-screen h-screen fixed inset-0 z-10 bg-white">
		<div class="p-4 flex flex-col h-full w-full">
			<Button class="w-fit self-end" on:click={onClick}><CloseIcon /></Button>
			<div class="container mx-auto flex-1 flex justify-center items-center">
				<slot />
			</div>
		</div>
	</div>
{/if}
