import { createTable, type Column } from '$lib/components/Table/createTable';
import type { ANTTestAnalysis, ANTTestResult } from './types';

const columns = {
	index: {
		title: 'Index'
	},
	correct: {
		title: 'Status',
		type: 'boolean'
	},
	duration: {
		title: 'Response time (ms)'
	},
	cue: {
		title: 'Cue'
	},
	condition: {
		title: 'Condition'
	},
	direction: {
		title: 'Direction'
	},
	position: {
		title: 'Position'
	}
} satisfies Record<string, Column>;

export const createResultsTable = (results: ANTTestResult[]) =>
	createTable(
		columns,
		results.map(
			({ correct, duration, targetCondition, targetDirection, targetPosition, cue }, i) => ({
				index: {
					value: i + 1
				},
				correct: {
					value: correct
				},
				duration: {
					value: Math.floor(duration)
				},
				cue: {
					value: cue
				},
				condition: {
					value: targetCondition
				},
				direction: {
					value: targetDirection
				},
				position: {
					value: targetPosition
				}
			})
		)
	);

export const createResponseTimeAnalysisTable = (analysis: ANTTestAnalysis) =>
	createTable(
		{
			congruency: {
				title: 'Congruency'
			},
			none: {
				title: 'None'
			},
			center: {
				title: 'Center'
			},
			double: {
				title: 'Double'
			},
			spatial: {
				title: 'Up/Down'
			}
		},
		[
			{
				congruency: {
					value: 'Congruent'
				},
				none: {
					value: `${analysis.responseTime.none.congruent.mean} (${analysis.responseTime.none.congruent.standardDev})`
				},
				center: {
					value: `${analysis.responseTime.center.congruent.mean} (${analysis.responseTime.center.congruent.standardDev})`
				},
				double: {
					value: `${analysis.responseTime.double.congruent.mean} (${analysis.responseTime.double.congruent.standardDev})`
				},
				spatial: {
					value: `${analysis.responseTime.spatial.congruent.mean} (${analysis.responseTime.spatial.congruent.standardDev})`
				}
			},
			{
				congruency: {
					value: 'Incongruent'
				},
				none: {
					value: `${analysis.responseTime.none.incongruent.mean} (${analysis.responseTime.none.incongruent.standardDev})`
				},
				center: {
					value: `${analysis.responseTime.center.incongruent.mean} (${analysis.responseTime.center.incongruent.standardDev})`
				},
				double: {
					value: `${analysis.responseTime.double.incongruent.mean} (${analysis.responseTime.double.incongruent.standardDev})`
				},
				spatial: {
					value: `${analysis.responseTime.spatial.incongruent.mean} (${analysis.responseTime.spatial.incongruent.standardDev})`
				}
			},
			{
				congruency: {
					value: 'Neutral'
				},
				none: {
					value: `${analysis.responseTime.none.neutral.mean} (${analysis.responseTime.none.neutral.standardDev})`
				},
				center: {
					value: `${analysis.responseTime.center.neutral.mean} (${analysis.responseTime.center.neutral.standardDev})`
				},
				double: {
					value: `${analysis.responseTime.double.neutral.mean} (${analysis.responseTime.double.neutral.standardDev})`
				},
				spatial: {
					value: `${analysis.responseTime.spatial.neutral.mean} (${analysis.responseTime.spatial.neutral.standardDev})`
				}
			},
			{
				congruency: {
					value: 'Total'
				},
				none: {
					value: `${analysis.responseTime.none.total.mean} (${analysis.responseTime.none.total.standardDev})`
				},
				center: {
					value: `${analysis.responseTime.center.total.mean} (${analysis.responseTime.center.total.standardDev})`
				},
				double: {
					value: `${analysis.responseTime.double.total.mean} (${analysis.responseTime.double.total.standardDev})`
				},
				spatial: {
					value: `${analysis.responseTime.spatial.total.mean} (${analysis.responseTime.spatial.total.standardDev})`
				}
			}
		]
	);

export const createErrorRateAnalysisTable = (analysis: ANTTestAnalysis) =>
	createTable(
		{
			congruency: {
				title: 'Congruency'
			},
			none: {
				title: 'None'
			},
			center: {
				title: 'Center'
			},
			double: {
				title: 'Double'
			},
			spatial: {
				title: 'Up/Down'
			}
		},
		[
			{
				congruency: {
					value: 'Congruent'
				},
				none: {
					value: `${analysis.errorRate.none.congruent.rate} (${analysis.errorRate.none.congruent.standardDev})`
				},
				center: {
					value: `${analysis.errorRate.center.congruent.rate} (${analysis.errorRate.center.congruent.standardDev})`
				},
				double: {
					value: `${analysis.errorRate.double.congruent.rate} (${analysis.errorRate.double.congruent.standardDev})`
				},
				spatial: {
					value: `${analysis.errorRate.spatial.congruent.rate} (${analysis.errorRate.spatial.congruent.standardDev})`
				}
			},
			{
				congruency: {
					value: 'Incongruent'
				},
				none: {
					value: `${analysis.errorRate.none.incongruent.rate} (${analysis.errorRate.none.incongruent.standardDev})`
				},
				center: {
					value: `${analysis.errorRate.center.incongruent.rate} (${analysis.errorRate.center.incongruent.standardDev})`
				},
				double: {
					value: `${analysis.errorRate.double.incongruent.rate} (${analysis.errorRate.double.incongruent.standardDev})`
				},
				spatial: {
					value: `${analysis.errorRate.spatial.incongruent.rate} (${analysis.errorRate.spatial.incongruent.standardDev})`
				}
			},
			{
				congruency: {
					value: 'Neutral'
				},
				none: {
					value: `${analysis.errorRate.none.neutral.rate} (${analysis.errorRate.none.neutral.standardDev})`
				},
				center: {
					value: `${analysis.errorRate.center.neutral.rate} (${analysis.errorRate.center.neutral.standardDev})`
				},
				double: {
					value: `${analysis.errorRate.double.neutral.rate} (${analysis.errorRate.double.neutral.standardDev})`
				},
				spatial: {
					value: `${analysis.errorRate.spatial.neutral.rate} (${analysis.errorRate.spatial.neutral.standardDev})`
				}
			},
			{
				congruency: {
					value: 'Total'
				},
				none: {
					value: `${analysis.errorRate.none.total.rate} (${analysis.errorRate.none.total.standardDev})`
				},
				center: {
					value: `${analysis.errorRate.center.total.rate} (${analysis.errorRate.center.total.standardDev})`
				},
				double: {
					value: `${analysis.errorRate.double.total.rate} (${analysis.errorRate.double.total.standardDev})`
				},
				spatial: {
					value: `${analysis.errorRate.spatial.total.rate} (${analysis.errorRate.spatial.total.standardDev})`
				}
			}
		]
	);
