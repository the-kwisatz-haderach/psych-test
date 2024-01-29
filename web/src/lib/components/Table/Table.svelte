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
	let sortBy = '';
	let sortAsc = false;

	const onClickHeadCell = (columnId: string) => {
		if (sortBy === columnId) {
			sortAsc = !sortAsc;
		} else {
			sortBy = columnId;
		}
	};

	$: rows = rows.sort((a, b) => {
		if (!(sortBy in a && sortBy in b)) return 0;
		let sortValue = 0;
		if (a[sortBy].value > b[sortBy].value) {
			sortValue = -1;
		} else if (a[sortBy].value < b[sortBy].value) {
			sortValue = 1;
		}
		return sortValue * (sortAsc ? 1 : -1);
	});
</script>

<Table striped divClass="relative overflow-x-auto border">
	<TableHead theadClass="text-xs uppercase bg-gray-200">
		{#each Object.keys(columns) as columnId}
			<TableHeadCell class="cursor-pointer" on:click={() => onClickHeadCell(columnId)}
				>{columns[columnId].title}</TableHeadCell
			>
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
