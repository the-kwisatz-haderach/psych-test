<script lang="ts">
	import type { TargetCondition, TargetDirection } from '$lib/tests/ant/types';
	import dashImgSrc from '$lib/assets/dash.png';
	import rightArrowImgSrc from '$lib/assets/right-arrow.png';
	import leftArrowImgSrc from '$lib/assets/left-arrow.png';

	const symbols = {
		ArrowRight: rightArrowImgSrc,
		ArrowLeft: leftArrowImgSrc,
		neutral: dashImgSrc
	} as const;

	export let direction: TargetDirection = 'ArrowLeft';
	export let condition: TargetCondition = 'neutral';
</script>

<img
	alt="target"
	src={condition === 'neutral' ? dashImgSrc : symbols[direction]}
	class:reverse={condition === 'incongruent'}
/>
<img
	alt="target"
	src={condition === 'neutral' ? dashImgSrc : symbols[direction]}
	class:reverse={condition === 'incongruent'}
/>
<img alt="target" src={symbols[direction]} />
<img
	alt="target"
	src={condition === 'neutral' ? dashImgSrc : symbols[direction]}
	class:reverse={condition === 'incongruent'}
/>
<img
	alt="target"
	src={condition === 'neutral' ? dashImgSrc : symbols[direction]}
	class:reverse={condition === 'incongruent'}
/>

<style lang="scss">
	.reverse {
		transform: rotate(180deg);
	}
	img {
		width: 70px;
		height: 70px;
	}
</style>
