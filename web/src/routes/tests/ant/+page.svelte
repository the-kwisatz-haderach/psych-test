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
	import { createStateGenerator } from '$lib/init';
	import { tick } from 'svelte';
	import { setupListener, wait } from '$lib/helpers';
	import type { Condition, TargetDirection, Cue } from '$lib/types';

	type Result = {
		duration: number;
		correct: boolean;
		state: {
			positions: ('top' | 'bottom' | 'center')[];
			cue: Cue;
			targetDirection: TargetDirection;
			targetCondition: Condition;
			hasCue: boolean;
		};
	};

	let cueDuration = '400';
	let soaDuration = '400';
	let fixationDuration = '400';
	let testDuration = '5000';
	let targetMaxTime = '1700';

	let positions: ('top' | 'bottom' | 'center')[] = [];
	let targetDirection: TargetDirection = 'ArrowLeft';
	let targetCondition: Condition = 'neutral';

	let show = false;
	let isRunning = false;
	let showCue = false;
	let sessionResults: Result[] = [];

	let controller = new AbortController();

	const onSubmit = async () => {
		controller = new AbortController();
		const results = [];
		isRunning = true;
		await tick(); // Wait for DOM to update before initialization.

		const generateState = createStateGenerator(Number.parseInt(testDuration));
		for (const state of generateState()) {
			if (controller.signal.aborted) {
				break;
			}
			positions = state.positions;
			targetDirection = state.targetDirection;
			targetCondition = state.targetCondition;

			// Fixation
			await wait(Number.parseInt(fixationDuration));
			if (controller.signal.aborted) {
				break;
			}

			// Cue
			if (state.hasCue) {
				showCue = true;
				show = true;
				await wait(Number.parseInt(cueDuration));
				if (controller.signal.aborted) {
					break;
				}
				show = false;
				showCue = false;
			}

			// SOA
			await wait(Number.parseInt(soaDuration));
			if (controller.signal.aborted) {
				break;
			}

			show = true;

			const start = performance.now();
			const key = await Promise.race([setupListener(), wait(Number.parseInt(targetMaxTime))]);
			const end = performance.now();
			results.push({
				duration: Math.min(end - start, Number.parseInt(targetMaxTime)),
				correct: key === state.targetDirection,
				state
			});
			show = false;
		}

		sessionResults = results;
		isRunning = false;
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
<div class="mt-10 flex justify-center">
	<Button form="test-settings" type="submit">Start</Button>
</div>

<TestContainer onClose={() => controller.abort()} bind:open={isRunning}>
	<div class="main fixation" class:show>
		<div class="target">
			{#if positions.includes('top')}
				<Symbol direction={targetDirection} condition={showCue ? 'cue' : targetCondition} />
			{/if}
		</div>
		<div class="target">
			{#if positions.includes('center')}
				<Symbol direction={targetDirection} condition={showCue ? 'cue' : targetCondition} />
			{/if}
		</div>
		<div class="target">
			{#if positions.includes('bottom')}
				<Symbol direction={targetDirection} condition={showCue ? 'cue' : targetCondition} />
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

	.fixation {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.fixation::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100px;
		height: 2px;
		background-color: black;
		transform: translateX(-50px);
	}

	.fixation::after {
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
