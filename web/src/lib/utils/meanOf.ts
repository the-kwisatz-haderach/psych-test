export const meanOf = (arr: number[]) =>
	arr.reduce((acc, curr) => acc + curr, 0) / (arr.length || 1);
