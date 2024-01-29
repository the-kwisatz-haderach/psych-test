<script lang="ts">
	import type { ANTTestState } from '$lib/tests/ant/types';
	import Cue from './Cue.svelte';
	import Target from './Target.svelte';

	export let state: ANTTestState;
	export let countdown = 0;
</script>

<div class="main">
	{#if countdown > 0}
		<div class="absolute inset-0 z-10 flex items-center justify-center bg-white text-9xl">
			{countdown}
		</div>
	{/if}
	{#if state.phase === 'cue'}
		<div class="target">
			{#if state.cue === 'double' || (state.cue === 'spatial' && state.targetPosition === 'top')}
				<Cue />
			{/if}
		</div>
		<div class="target">
			{#if state.cue === 'center'}
				<Cue />
			{/if}
		</div>
		<div class="target">
			{#if state.cue === 'double' || (state.cue === 'spatial' && state.targetPosition === 'bottom')}
				<Cue />
			{/if}
		</div>
	{:else if state.phase === 'target'}
		<div class="target">
			{#if state.targetPosition === 'top'}
				<Target direction={state.targetDirection} condition={state.targetCondition} />
			{/if}
		</div>
		<div class="target" />
		<div class="target">
			{#if state.targetPosition === 'bottom'}
				<Target direction={state.targetDirection} condition={state.targetCondition} />
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.main {
		border: 1px solid lightgray;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
