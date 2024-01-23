<script lang="ts">
	import { CheckSolid as CheckMark, CloseSolid as Cross } from 'flowbite-svelte-icons';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { Cell, Column } from './createTable';

	export let columns: Record<string, Column> = {};
	export let rows: Record<string, Cell>[] = [];
</script>

<Table striped divClass="relative overflow-x-auto border">
	<TableHead theadClass="text-xs uppercase bg-gray-200">
		{#each Object.values(columns) as column}
			<TableHeadCell>{column.title}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each rows as row}
			<TableBodyRow>
				{#each Object.keys(columns) as columnId}
					<TableBodyCell>
						{#if typeof row[columnId].value === 'boolean'}
							{#if row[columnId].value}
								<CheckMark />
							{:else}
								<Cross />
							{/if}
						{:else}
							{row[columnId].value}
						{/if}
					</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
