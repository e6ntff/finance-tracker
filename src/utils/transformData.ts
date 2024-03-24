import {
	ExpenseItem,
	Interval,
	ListOptions,
	Value,
	language,
} from 'settings/interfaces';
import { sortBy } from './utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const getFilteredListIds = (
	options: ListOptions,
	list: { [key: string]: ExpenseItem },
	language: language,
	isAccurate: boolean
) => {
	const { range, categoriesToFilterIds, sortingAlgorithm, isSortingReversed } =
		options;
	return sortBy(
		list,
		Object.keys(list).filter((key: string) => {
			if (!categoriesToFilterIds.length) {
				return list[Number(key)].date.isBetween(
					dayjs(range[0]),
					dayjs(range[1]),
					isAccurate ? 'day' : 'month',
					'[]'
				);
			} else {
				return (
					list[Number(key)].date.isBetween(
						dayjs(range[0]),
						dayjs(range[1]),
						'day',
						'[]'
					) &&
					categoriesToFilterIds.some(
						(id: string) => list[key].categoryId === id
					)
				);
			}
		}),
		sortingAlgorithm,
		isSortingReversed,
		language
	);
};

export const getListToShowOnCurrentPageIds = (
	options: ListOptions,
	filteredListIds: string[]
) => {
	const { currentPage, pageSize } = options;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	return filteredListIds.slice(startIndex, endIndex);
};

export const getValuesForBarDiagram = (
	list: { [key: string]: ExpenseItem },
	currency: string,
	mode: Interval,
	year: number
) => {
	if (mode === 'year') {
		const result: { [key: number]: number } = {};
		Object.keys(list).forEach((key: string) => {
			const resultKey: number = list[key].date.year();
			if (result[resultKey] === undefined) {
				result[resultKey] = 0;
			} else {
				result[resultKey] += list[key].price[currency];
			}
		});
		for (let year in result) {
			result[year] = Math.round(result[year]);
		}
		return result;
	} else if (mode === 'month') {
		const result: number[] = new Array(12).fill(0);
		Object.keys(list).forEach((key: string) => {
			if (list[key].date.year() === year) {
				const index: number = list[key].date.month();
				result[index] += list[key].price[currency];
			}
		});

		return result.map((item: number) => Math.round(item));
	}
	return [];
};

export const getValuesForPieDiagram = (
	list: { [key: string]: ExpenseItem },
	range: number[],
	currency: string,
	isAccurate: boolean
) => {
	const values: Value[] = [];
	Object.keys(list).forEach((key: string) => {
		if (
			list[key].date.isBetween(
				dayjs(range[0]),
				dayjs(range[1]),
				isAccurate ? 'day' : 'month',
				'[]'
			)
		) {
			const categoryKey: number = Object.keys(values).findIndex(
				(key: string) => values[Number(key)].categoryId === list[key].categoryId
			);
			if (categoryKey !== -1) {
				values[categoryKey].value += list[key].price[currency];
			} else {
				values.push({
					categoryId: list[key].categoryId,
					value: list[key].price[currency],
				});
			}
		}
	});
	return values.map((value: Value) => ({
		...value,
		value: Math.round(value.value),
	}));
};

export const getTotalInCurrentRange = (
	list: { [key: string]: ExpenseItem },
	range: number[],
	currency: string,
	isAccurate: boolean
) =>
	Math.floor(
		Object.values(list).reduce((acc: number, item: ExpenseItem) => {
			if (
				item.date.isBetween(
					dayjs(range[0]),
					dayjs(range[1]),
					isAccurate ? 'hour' : 'day',
					'()'
				)
			) {
				return acc + item.price[currency];
			}
			return acc;
		}, 0)
	);

export const getValuesByMonth = (
	list: { [key: string]: ExpenseItem },
	range: number[]
) => {
	const values: number[] = [];
	const end = dayjs(range[1]);
	let startDate = dayjs(range[0]);
	let endDate = dayjs(range[0]).add(1, 'month');

	while (!endDate.isAfter(end, 'day')) {
		// eslint-disable-next-line
		const itemsInMonth = Object.values(list).filter((item: ExpenseItem) =>
			item.date.isBetween(startDate, endDate, 'day', '[]')
		);
		const valueForMonth = itemsInMonth.reduce(
			(acc, item) => acc + item.price.USD,
			0
		);
		values.push(valueForMonth);
		startDate = startDate.add(1, 'month');
		endDate = endDate.add(1, 'month');
	}

	return values;
};
