<script lang="ts">
	import type { TestConfig } from '$lib/tests/ant/types';
	import type { Stringify } from '$lib/utilityTypes';
	import { Button, Input, Label } from 'flowbite-svelte';

	export let onSubmit: (data: TestConfig) => void;

	export let defaultValues: TestConfig = {
		cueDuration: 100,
		fixationDuration: 400,
		testDuration: 20,
		targetMaxTime: 1700,
		intermediateFixationDuration: 400
	};

	let values: TestConfig | Stringify<TestConfig> = {
		cueDuration: defaultValues.cueDuration,
		fixationDuration: defaultValues.fixationDuration,
		testDuration: defaultValues.testDuration,
		targetMaxTime: defaultValues.targetMaxTime,
		intermediateFixationDuration: defaultValues.intermediateFixationDuration
	};

	const handleSubmit = () => {
		onSubmit({
			cueDuration:
				typeof values.cueDuration === 'string'
					? Number.parseInt(values.cueDuration)
					: values.cueDuration,
			fixationDuration:
				typeof values.fixationDuration === 'string'
					? Number.parseInt(values.fixationDuration)
					: values.fixationDuration,
			targetMaxTime:
				typeof values.targetMaxTime === 'string'
					? Number.parseInt(values.targetMaxTime)
					: values.targetMaxTime,
			testDuration:
				typeof values.testDuration === 'string'
					? Number.parseInt(values.testDuration)
					: values.testDuration,
			intermediateFixationDuration:
				typeof values.intermediateFixationDuration === 'string'
					? Number.parseInt(values.intermediateFixationDuration)
					: values.intermediateFixationDuration
		});
	};
</script>

<form id="test-settings" on:submit|preventDefault={handleSubmit} class="flex flex-1 flex-col gap-2">
	<Label for="testDuration" defaultClass="w-full"
		>Test duration (seconds)
		<Input
			bind:value={values.testDuration}
			autofocus
			name="testDuration"
			type="number"
			step={1}
			min={5}
			max={120}
		/></Label
	>
	<Label for="cueDuration" defaultClass="w-full"
		>Cue duration (ms)
		<Input
			bind:value={values.cueDuration}
			name="cueDuration"
			type="number"
			min={100}
			step={100}
			max={800}
		/>
	</Label>
	<Label for="fixationDuration" defaultClass="w-full"
		>Fixation duration (ms)
		<Input
			bind:value={values.fixationDuration}
			name="fixationDuration"
			type="number"
			step={100}
			min={400}
			max={1600}
		/>
	</Label>
	<Button class="mt-2" type="submit">Submit</Button>
</form>
