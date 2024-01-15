<script lang="ts">
	import { init } from '$lib/init';

	let cueDuration = 400;
	let fixationDuration = 400;
	let testDuration = 5000;
	let withCue = false;

	let isRunning = false;

	let results: Awaited<ReturnType<typeof init>> = [];

	const onSubmit = async () => {
		isRunning = true;
		results = await init({ cueDuration, fixationDuration, testDuration, withCue });
		isRunning = false;
	};
</script>

<div class="container">
	{#if !isRunning}
		<div class="start-page">
			<div class="wrapper">
				<form on:submit|preventDefault={onSubmit}>
					<span>
						<label for="cueDuration">Cue duration (ms)</label>
						<input
							bind:value={cueDuration}
							id="cueDuration"
							name="cueDuration"
							type="number"
							min="400"
							step="100"
							max="800"
						/>
					</span>
					<span>
						<label for="fixationDuration">Fixation duration (ms)</label>
						<input
							bind:value={fixationDuration}
							id="fixationDuration"
							name="fixationDuration"
							type="number"
							step="100"
							min="400"
							max="1600"
						/>
					</span>
					<span>
						<label for="testDuration">Test duration (ms)</label>
						<input
							bind:value={testDuration}
							id="testDuration"
							name="testDuration"
							type="number"
							step="100"
							min="5000"
							max="120000"
						/>
					</span>
					<span>
						<label for="withCue">With cue</label>
						<input bind:checked={withCue} id="withCue" name="withCue" type="checkbox" />
					</span>
					<button type="submit">Start</button>
				</form>
				<div class="results-container">
					<table>
						<thead>
							<tr>
								<th>Duration</th>
								<th>Correct</th>
								<th>Direction</th>
								<th>Condition</th>
								<th>Cue</th>
							</tr>
						</thead>
						<tbody id="results">
							{#each results as result}
								<tr>
									<td>{Math.floor(result.duration)} ms</td>
									<td>{result.correct}</td>
									<td>{result.state.targetDirection}</td>
									<td>{result.state.targetCondition}</td>
									<td>{result.hasCue}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	{/if}
	<main>
		<div id="top" class="target"></div>
		<div id="center" class="target fixation"></div>
		<div id="bottom" class="target"></div>
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	main {
		border: 1px solid lightgray;
		display: flex;
		flex-direction: column;
		max-width: 1000px;
		max-height: 700px;
		margin: auto;
		height: 100%;
		width: 100%;
	}

	.wrapper {
		max-width: 600px;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.start-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		position: fixed;
		inset: 0;
		z-index: 1;
		background-color: gainsboro;
	}

	form {
		width: 100%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 8px;
		background-color: white;
	}

	span {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}

	input {
		width: 50px;
	}

	.symbol {
		font-size: 100px;
		display: inline-block;
		height: fit-content;
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

	.hide {
		display: none;
	}

	.target > div {
		display: none;
	}

	.target.show > div {
		display: initial;
	}

	.fixation {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.reverse {
		transform: rotate(180deg);
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

	table {
		border-collapse: collapse;
	}

	th,
	td,
	tr,
	table {
		border: 1px solid grey;
	}

	th,
	td {
		text-align: left;
		padding: 4px 8px;
	}
</style>
