<script lang="ts">
	import { init } from '$lib/init';
	import { onMount } from 'svelte';

	let cueDuration = 400;
	let fixationDuration = 400;
	let testDuration = 5000;

	let results: Awaited<ReturnType<typeof init>> = [];
	let top: HTMLDivElement;
	let center: HTMLDivElement;
	let bottom: HTMLDivElement;

	onMount(async () => {
		console.log({ top, center, bottom });
		const result = await init({
			cueDuration,
			fixationDuration,
			testDuration,
			elements: { top, center, bottom }
		});
		console.log({ result });
	});
</script>

<div class="main">
	<div bind:this={top} id="top" class="target" />
	<div bind:this={center} id="center" class="target fixation" />
	<div bind:this={bottom} id="bottom" class="target" />
</div>

<style lang="scss">
	.main {
		border: 1px solid lightgray;
		display: flex;
		flex-direction: column;
		max-width: 1000px;
		max-height: 700px;
		margin: auto;
		height: 100%;
		width: 100%;
	}

	:global(.symbol) {
		font-size: 100px;
		display: inline-block;
		height: fit-content;
	}

	:global(.target) {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 1rem;
	}

	:global(.hide) {
		display: none;
	}

	:global(.target > div) {
		display: none;
	}

	:global(.target.show > div) {
		display: initial;
	}

	:global(.fixation) {
		position: relative;
		height: 100%;
		width: 100%;
	}

	:global(.reverse) {
		transform: rotate(180deg);
	}

	:global(.fixation::before) {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100px;
		height: 2px;
		background-color: black;
		transform: translateX(-50px);
	}

	:global(.fixation::after) {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2px;
		height: 100px;
		background-color: black;
		transform: translateY(-50px);
	}
</style>
