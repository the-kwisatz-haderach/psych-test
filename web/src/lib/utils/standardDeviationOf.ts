import { meanOf } from './meanOf';

export const standardDeviationOf = (data: number[]) => {
	const mean = meanOf(data);
	const deviations = data.map((num) => (num - mean) ** 2);
	const variance = meanOf(deviations);
	return Math.sqrt(variance);
};
