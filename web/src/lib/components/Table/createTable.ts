type ValueTypes = {
	string: string | boolean | number;
	boolean: boolean;
	number: number;
};

type ValueType = keyof ValueTypes;

export type Column = {
	title: string;
	type?: ValueType;
};

export type Cell<T extends ValueType = ValueType> = {
	value: ValueTypes[T];
};

export const createTable = <T extends Record<string, Column>>(
	columns: T,
	rows: {
		[K in keyof T]: Cell<
			undefined extends T[K]['type'] ? 'string' : Exclude<T[K]['type'], undefined>
		>;
	}[]
) => ({
	columns,
	rows
});
