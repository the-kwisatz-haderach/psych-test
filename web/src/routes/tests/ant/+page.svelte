<script lang="ts">
	import {
		Button,
		Heading,
		P,
		Input,
		Label,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import CheckMark from 'flowbite-svelte-icons/CheckSolid.svelte';
	import Cross from 'flowbite-svelte-icons/CloseSolid.svelte';
	import TestContainer from '$lib/components/TestContainer/TestContainer.svelte';
	import { init } from '$lib/init';
	import { tick } from 'svelte';

	let cueDuration = '400';
	let fixationDuration = '400';
	let testDuration = '5000';

	let isRunning = false;
	let sessionResults: Awaited<ReturnType<typeof init>> = [];

	const onSubmit = async () => {
		isRunning = true;
		await tick();

		const results = await init({
			cueDuration: Number.parseInt(cueDuration),
			fixationDuration: Number.parseInt(fixationDuration),
			testDuration: Number.parseInt(testDuration)
		});
		sessionResults = results;
		isRunning = false;
	};
</script>

<Heading class="leading-relaxed">Attention Network Test (ANT)</Heading>
<P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eius.</P>
<div class="flex justify-between mt-8 gap-8">
	<form id="test-settings" on:submit|preventDefault={onSubmit} class="flex flex-col flex-1 gap-2">
		<Heading tag="h3">Settings</Heading>
		<Label for="cueDuration" defaultClass="w-full"
			>Cue duration (ms)
			<Input
				bind:value={cueDuration}
				id="cueDuration"
				name="cueDuration"
				type="number"
				min="400"
				step="100"
				max="800"
			/>
		</Label>
		<Label for="fixationDuration" defaultClass="w-full"
			>Fixation duration (ms)
			<Input
				bind:value={fixationDuration}
				id="fixationDuration"
				name="fixationDuration"
				type="number"
				step="100"
				min="400"
				max="1600"
			/>
		</Label>
		<Label for="testDuration" defaultClass="w-full"
			>Test duration (ms)
			<Input
				bind:value={testDuration}
				id="testDuration"
				name="testDuration"
				type="number"
				step="100"
				min="5000"
				max="120000"
			/></Label
		>
	</form>
	<div class="flex-1">
		<Table class="overflow-scroll">
			<TableHead>
				<TableHeadCell>Duration</TableHeadCell>
				<TableHeadCell>Correct</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each sessionResults as result}
					<TableBodyRow>
						<TableBodyCell>{Math.floor(result.duration)}</TableBodyCell>
						<TableBodyCell>
							{#if result.correct}
								<CheckMark />
							{:else}
								<Cross />
							{/if}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
<div class="flex justify-center mt-10">
	<Button form="test-settings" type="submit">Start</Button>
</div>

<TestContainer bind:open={isRunning}>
	<div class="main">
		<div id="top" class="target" />
		<div id="center" class="target fixation" />
		<div id="bottom" class="target" />
	</div>
</TestContainer>

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
