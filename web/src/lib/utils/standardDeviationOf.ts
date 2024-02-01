import { meanOf } from './meanOf';

export const standardDeviationOf = (data: number[], mean?: number) => {
	if (data.length < 1) {
		return 0;
	}
	const meanNum = mean ?? meanOf(data);
	const deviations = data.map((num) => (num - meanNum) ** 2);
	const variance = meanOf(deviations);
	return +Math.sqrt(variance).toFixed(2);
};
