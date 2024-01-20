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
	import Symbol from './Symbol.svelte';
	import { createStateGenerator } from '$lib/tests/ant/createStateGenerator';
	import { tick } from 'svelte';
	import { setupListener, abortable } from '$lib/utils/helpers';
	import w from '$lib/utils/wait';
	import type { ANTTestResult, ANTTestState } from '$lib/tests/ant/types';

	let cueDuration = '400';
	let soaDuration = '400';
	let fixationDuration = '400';
	let testDurationSec = '20';
	let targetMaxTime = '1700';

	let show = false;
	let isRunning = false;
	let showCue = false;
	let sessionResults: ANTTestResult[] = [];
	let controller = new AbortController();
	let runningTime = 0;
	let count = 3;

	let state: ANTTestState = {
		positions: [],
		targetCondition: 'neutral',
		targetDirection: 'ArrowLeft',
		hasCue: false,
		cue: 'none'
	};

	const countDown = (signal?: AbortSignal) =>
		new Promise<void>((resolve) => {
			let interval: number;
			interval = setInterval(() => {
				count -= 1;
				if (count < 0 || signal?.aborted) {
					clearInterval(interval);
					resolve();
				}
			}, 1000);
		});

	const onSubmit = async () => {
		await tick(); // Wait for DOM to update before initialization.
		controller = new AbortController();
		const wait = abortable(w, controller.signal);
		sessionResults = [];
		isRunning = true;
		runningTime = 0;

		await countDown();

		const generateState = createStateGenerator(Number.parseInt(testDurationSec) * 1000);

		const interval = setInterval(() => {
			runningTime += 0.2;
		}, 200);

		for (const newState of generateState()) {
			state = newState;
			try {
				// Fixation
				await wait(Number.parseInt(fixationDuration));

				// Cue
				if (state.hasCue) {
					showCue = true;
					show = true;
					await wait(Number.parseInt(cueDuration));
					show = false;
					showCue = false;
				}

				// SOA
				await wait(Number.parseInt(soaDuration));
				show = true;

				const start = performance.now();
				const key = await Promise.race([setupListener(), wait(Number.parseInt(targetMaxTime))]);
				const end = performance.now();

				sessionResults = [
					...sessionResults,
					{
						duration: Math.min(end - start, Number.parseInt(targetMaxTime)),
						correct: key === state.targetDirection,
						state
					}
				];
			} catch {
				break;
			} finally {
				show = false;
			}
		}
		isRunning = false;
		clearInterval(interval);
	};
</script>

<Heading class="leading-relaxed">Attention Network Test (ANT)</Heading>
<P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eius.</P>
<div class="mt-8 flex justify-between gap-8">
	<form id="test-settings" on:submit|preventDefault={onSubmit} class="flex flex-1 flex-col gap-2">
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
			>Test duration (seconds)
			<Input
				bind:value={testDurationSec}
				id="testDuration"
				name="testDuration"
				type="number"
				step="1"
				min="5"
				max="120"
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
<div class="mt-10 flex justify-center">
	<Button form="test-settings" type="submit">Start</Button>
</div>

<TestContainer onClose={controller.abort.bind(controller)} bind:open={isRunning}>
	<div class="main" class:show>
		{#if count > 0}
			<div class="absolute inset-0 z-10 flex items-center justify-center bg-white text-9xl">
				{count}
			</div>
		{/if}
		<div class="target">
			{#if state.positions.includes('top')}
				<Symbol
					direction={state.targetDirection}
					condition={showCue ? 'cue' : state.targetCondition}
				/>
			{/if}
		</div>
		<div class="target">
			{#if state.positions.includes('center')}
				<Symbol
					direction={state.targetDirection}
					condition={showCue ? 'cue' : state.targetCondition}
				/>
			{/if}
		</div>
		<div class="target">
			{#if state.positions.includes('bottom')}
				<Symbol
					direction={state.targetDirection}
					condition={showCue ? 'cue' : state.targetCondition}
				/>
			{/if}
		</div>
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
		position: relative;
		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: black;
		}
		&::after {
			width: 2px;
			height: 100px;
			transform: translateY(-50px);
		}
		&::before {
			width: 100px;
			height: 2px;
			transform: translateX(-50px);
		}
	}

	:global(.main > div > span) {
		display: none;
	}

	:global(.main.show > div > span) {
		display: unset;
	}

	.target {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 1rem;
	}
</style>
