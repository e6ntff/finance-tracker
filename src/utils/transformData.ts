import {
	ExpenseItem,
	Interval,
	ListOptions,
	Value,
	category,
	language,
} from 'settings/interfaces';
import { sortBy } from './utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const getFilteredList = (
	options: ListOptions,
	list: ExpenseItem[],
	language: language,
	isAccurate: boolean
) => {
	const { range, categoriesToFilter, sortingAlgorithm, isSortingReversed } =
		options;
	return sortBy(
		list.filter((item: ExpenseItem) => {
			if (!categoriesToFilter.length) {
				return item.date.isBetween(
					dayjs(range[0]),
					dayjs(range[1]),
					isAccurate ? 'day' : 'month',
					'[]'
				);
			} else {
				return (
					item.date.isBetween(dayjs(range[0]), dayjs(range[1]), 'day', '[]') &&
					categoriesToFilter.some(
						(category: category) => item.categoryId === category.id
					)
				);
			}
		}),
		sortingAlgorithm,
		isSortingReversed,
		language
	);
};

export const getListToShowOnCurrentPage = (
	options: ListOptions,
	filteredList: ExpenseItem[]
) => {
	const { currentPage, pageSize } = options;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	return filteredList.slice(startIndex, endIndex);
};

export const getValuesForBarDiagram = (
	list: ExpenseItem[],
	currency: string,
	mode: Interval,
	year: number
) => {
	if (mode === 'year') {
		const result: { [key: number]: number } = {};
		list.forEach((item: ExpenseItem) => {
			const key: number = item.date.year();
			if (result[key] === undefined) {
				result[key] = 0;
			} else {
				result[key] += item.price[currency];
			}
		});
		for (let year in result) {
			result[year] = Math.round(result[year]);
		}
		return result;
	} else if (mode === 'month') {
		const result: number[] = new Array(12).fill(0);
		list.forEach((item: ExpenseItem) => {
			if (item.date.year() === year) {
				const index: number = item.date.month();
				result[index] += item.price[currency];
			}
		});

		return result.map((item: number) => Math.round(item));
	}
	return [];
};

export const getValuesForPieDiagram = (
	list: ExpenseItem[],
	range: number[],
	currency: string,
	isAccurate: boolean,
	getCategoryById: (id: number) => category
) => {
	const values: Value[] = [];
	list.forEach((item: ExpenseItem) => {
		if (
			item.date.isBetween(
				dayjs(range[0]),
				dayjs(range[1]),
				isAccurate ? 'day' : 'month',
				'[]'
			)
		) {
			const indexOfCategory: number = values.findIndex(
				(value: Value) => value.category.id === item.categoryId
			);
			if (indexOfCategory !== -1) {
				values[indexOfCategory].value += item.price[currency];
			} else {
				values.push({
					category: getCategoryById(item.categoryId),
					value: item.price[currency],
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
	list: ExpenseItem[],
	range: number[],
	currency: string,
	isAccurate: boolean
) =>
	Math.floor(
		list.reduce((acc: number, item: ExpenseItem) => {
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
