<script lang="ts">
	import {
		Button,
		Heading,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Tabs,
		TabItem,
		GradientButton
	} from 'flowbite-svelte';
	import CheckMark from 'flowbite-svelte-icons/CheckSolid.svelte';
	import Cross from 'flowbite-svelte-icons/CloseSolid.svelte';
	import SettingsIcon from 'flowbite-svelte-icons/CogOutline.svelte';
	import TestContainer from '$lib/components/TestContainer/TestContainer.svelte';
	import { createStateGenerator } from '$lib/tests/ant/createStateGenerator';
	import { tick } from 'svelte';
	import { setupListener, abortable } from '$lib/utils/helpers';
	import w from '$lib/utils/wait';
	import type { ANTTestResult, ANTTestState, TestConfig } from '$lib/tests/ant/types';
	import { createCountdownHandler } from '$lib/stores/createCountdownHandler';
	import Display from './Display.svelte';
	import SettingsForm from './SettingsForm.svelte';
	import Drawer from '$lib/components/Drawer/Drawer.svelte';

	let testConfig: TestConfig = {
		cueDuration: 100,
		fixationDuration: 400,
		testDuration: 20,
		targetMaxTime: 1700,
		intermediateFixationDuration: 400
	};
	let hideSettings = true;
	let isRunning = false;
	let sessionResults: ANTTestResult[] = [];
	let controller = new AbortController();
	let tab: 'results' | 'instructions' = 'instructions';

	let state: ANTTestState = {
		phase: 'fixation',
		targetPosition: 'bottom',
		targetCondition: 'neutral',
		targetDirection: 'ArrowLeft',
		cue: 'none'
	};

	const { count, run } = createCountdownHandler(3);

	const handleUpdateSettings = (config: TestConfig) => {
		testConfig = config;
		hideSettings = true;
	};

	const handleStartTestRun = async () => {
		await tick(); // Wait for DOM to update before initialization.
		controller = new AbortController();
		const wait = abortable(w, controller.signal);
		sessionResults = [];
		isRunning = true;

		await run(controller.signal);

		const generateState = createStateGenerator(testConfig.testDuration * 1000);

		for (const newState of generateState()) {
			state = newState;
			try {
				switch (state.phase) {
					case 'fixation': {
						await wait(testConfig.fixationDuration);
						break;
					}
					case 'cue': {
						if (state.cue !== 'none') {
							await wait(testConfig.cueDuration);
						}
						break;
					}
					case 'intermediate-fixation': {
						await wait(testConfig.intermediateFixationDuration);
						break;
					}
					case 'target': {
						const start = performance.now();
						const key = await Promise.race([setupListener(), wait(testConfig.targetMaxTime)]);
						const end = performance.now();
						sessionResults = [
							...sessionResults,
							{
								duration: Math.min(end - start, testConfig.targetMaxTime),
								correct: key === state.targetDirection,
								state
							}
						];
						break;
					}
				}
			} catch {
				break;
			}
		}
		tab = 'results';
		isRunning = false;
	};
</script>

<Heading class="leading-relaxed">Attention Network Test (ANT)</Heading>

<div>
	<P class="inline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eius.</P>
</div>
<Tabs style="underline" contentClass="max-h-80 overflow-y-auto" class="mt-4">
	<TabItem
		on:click={() => (tab = 'instructions')}
		title="Instructions"
		open={tab === 'instructions'}
	>
		<div class="flex flex-col gap-4 p-4">
			<P
				>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, architecto! Nobis architecto
				delectus saepe voluptas consectetur officia in exercitationem ratione.</P
			>
			<P
				>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, architecto! Nobis architecto
				delectus saepe voluptas consectetur officia in exercitationem ratione.</P
			>
			<P
				>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, architecto! Nobis architecto
				delectus saepe voluptas consectetur officia in exercitationem ratione.</P
			>
		</div>
	</TabItem>
	<TabItem on:click={() => (tab = 'results')} title="Results" open={tab === 'results'}>
		<Table>
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
	</TabItem>
	<li class="flex flex-1 items-center justify-end gap-2">
		<Drawer bind:hidden={hideSettings} title="Settings">
			<Button on:click={() => (hideSettings = false)} color="light" slot="button"
				><SettingsIcon class="mr-2 opacity-50" /> Settings</Button
			>
			<SettingsForm onSubmit={handleUpdateSettings} defaultValues={testConfig} />
		</Drawer>
		<GradientButton color="green" on:click={handleStartTestRun}>Start test run</GradientButton>
	</li>
</Tabs>

<TestContainer onClose={controller.abort.bind(controller)} bind:open={isRunning}>
	<Display {state} countdown={$count} />
</TestContainer>
