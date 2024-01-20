<script lang="ts">
	import type { Condition, TargetDirection } from '$lib/tests/ant/types';

	const symbols = {
		ArrowRight: '→',
		ArrowLeft: '←',
		cue: '✴',
		neutral: '—',
		none: ''
	} as const;

	export let direction: TargetDirection = 'ArrowLeft';
	export let condition: Condition | 'cue' = 'neutral';
</script>

{#if condition === 'cue'}
	<span>{symbols.cue}</span>
{:else}
	<span class:reverse={condition === 'incongruent'}
		>{condition === 'neutral' ? symbols.neutral : symbols[direction]}</span
	>
	<span class:reverse={condition === 'incongruent'}
		>{condition === 'neutral' ? symbols.neutral : symbols[direction]}</span
	>
	<span>{symbols[direction]}</span>
	<span class:reverse={condition === 'incongruent'}
		>{condition === 'neutral' ? symbols.neutral : symbols[direction]}</span
	>
	<span class:reverse={condition === 'incongruent'}
		>{condition === 'neutral' ? symbols.neutral : symbols[direction]}</span
	>
{/if}

<style lang="scss">
	.reverse {
		transform: rotate(180deg);
	}

	span {
		font-size: 100px;
		display: inline-block;
		height: fit-content;
	}
</style>
