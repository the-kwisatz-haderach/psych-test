<script lang="ts">
	import { Button, Heading, P, Tabs, TabItem, GradientButton } from 'flowbite-svelte';
	import SettingsIcon from 'flowbite-svelte-icons/CogOutline.svelte';
	import TestContainer from '$lib/components/TestContainer/TestContainer.svelte';
	import { createStateGenerator } from '$lib/tests/ant/createStateGenerator';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { tick } from 'svelte';
	import { setupListener, abortable } from '$lib/utils/helpers';
	import w from '$lib/utils/wait';
	import {
		analyseTestResults,
		type ANTTestResult,
		type ANTTestState,
		type TestConfig
	} from '$lib/tests/ant/types';
	import { createCountdownHandler } from '$lib/stores/createCountdownHandler';
	import Display from './Display.svelte';
	import SettingsForm from './SettingsForm.svelte';
	import Drawer from '$lib/components/Drawer/Drawer.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import { createTable } from '$lib/components/Table/createTable';
	import { browser } from '$app/environment';

	let testConfig: TestConfig = {
		cueDuration: 100,
		fixationDuration: 400,
		testDuration: 20,
		targetMaxTime: 1700,
		intermediateFixationDuration: 400
	};
	let hideSettings = true;
	let isRunning = false;
	let sessionResults: ANTTestResult[] = browser
		? JSON.parse(sessionStorage.getItem('ant-results') || '[]')
		: [];
	$: testAnalysis = analyseTestResults(sessionResults);
	let controller = new AbortController();
	$: tab = ('tab' in $page.state && $page.state.tab) || 'instructions';

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
		let results: ANTTestResult[] = [];
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
						results = [
							...results,
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
		sessionResults = results;
		tab = 'results';
		isRunning = false;
		sessionStorage.setItem('ant-results', JSON.stringify(sessionResults));
	};

	$: table = createTable(
		{
			correct: {
				title: 'Status',
				type: 'boolean'
			},
			duration: {
				title: 'Response time (ms)'
			},
			cue: {
				title: 'Cue'
			},
			condition: {
				title: 'Condition'
			},
			direction: {
				title: 'Direction'
			},
			position: {
				title: 'Position'
			}
		},
		sessionResults.map(({ correct, duration, state }) => ({
			correct: {
				value: correct
			},
			duration: {
				value: Math.floor(duration)
			},
			cue: {
				value: state.cue
			},
			condition: {
				value: state.targetCondition
			},
			direction: {
				value: state.targetDirection
			},
			position: {
				value: state.targetPosition
			}
		}))
	);
</script>

<Heading class="leading-relaxed">Attention Network Test</Heading>

<div>
	<P class="inline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eius.</P>
</div>
<Tabs style="underline" contentClass="" class="mt-4">
	<TabItem
		on:click={() =>
			pushState('', {
				tab: 'instructions'
			})}
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
	<TabItem
		on:click={() =>
			pushState('', {
				tab: 'results'
			})}
		title="Results"
		open={tab === 'results'}
	>
		{#if testAnalysis.alerting > 0}
			<div class="my-4 flex gap-2">
				<div class="flex w-fit flex-col items-center justify-center rounded-md border p-4">
					<Heading tag="h6">Alerting</Heading>
					<P>{Math.floor(testAnalysis.alerting)}</P>
				</div>
				<div class="flex w-fit flex-col items-center justify-center rounded-md border p-4">
					<Heading tag="h6">Orienting</Heading>
					<P>{Math.floor(testAnalysis.orienting)}</P>
				</div>
				<div class="flex w-fit flex-col items-center justify-center rounded-md border p-4">
					<Heading tag="h6">Attention</Heading>
					<P>{Math.floor(testAnalysis.executiveAttention)}</P>
				</div>
			</div>
		{/if}
		<Table columns={table.columns} rows={table.rows} />
	</TabItem>
	<li class="flex flex-1 items-start justify-end gap-2">
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
