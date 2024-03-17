import {
	ExpenseItem,
	Interval,
	Options,
	Value,
	category,
	currencies,
	language,
} from 'settings/interfaces';
import { sortBy } from './utils';

export const getFilteredList = (
	options: Options,
	list: ExpenseItem[],
	language: language
) => {
	const { years, categoriesToFilter, sortingAlgorithm, isSortingReversed } =
		options;
	if (years || categoriesToFilter) {
		return sortBy(
			list.filter((item: ExpenseItem) => {
				if (!categoriesToFilter.length && years.length)
					return years.some(
						(year: string) => item.date.year().toString() === year
					);
				if (!years.length && categoriesToFilter.length)
					return categoriesToFilter.some(
						(category: category) => item.category.id === category.id
					);
				if (years.length && categoriesToFilter.length)
					return (
						years.some(
							(year: string) => item.date.year().toString() === year
						) &&
						categoriesToFilter.some(
							(category: category) => item.category.id === category.id
						)
					);
				return item;
			}),
			sortingAlgorithm,
			isSortingReversed,
			language
		);
	} else {
		return sortBy(list, sortingAlgorithm, isSortingReversed, language);
	}
};

export const getListToShowOnCurrentPage = (
	options: Options,
	filteredList: ExpenseItem[]
) => {
	const { currentPage, pageSize } = options;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	return filteredList.slice(startIndex, endIndex);
};

export const getValuesForBarDiagram = (
	interval: Interval,
	list: ExpenseItem[],
	currency: string
) => {
	if (interval === 'month') {
		const result: number[] = new Array(12).fill(0);

		list.forEach((item: ExpenseItem) => {
			const key = item.date.month();
			result[key] += item.price[currency];
		});
		return result;
	} else if (interval === 'year') {
		const result: { [key: string]: number } = {};
		list.forEach((item: ExpenseItem) => {
			const key = item.date.year().toString();
			if (result[key] === undefined) {
				result[key] = 0;
			} else {
				result[key] += item.price[currency];
			}
		});
		return result;
	}
	return [];
};

export const getValuesForPieDiagram = (
	interval: Interval,
	list: ExpenseItem[],
	intervalBig: number | null,
	intervalSmall: number | null,
	currency: string
) => {
	const values: Value[] = [];
	list.forEach((item: ExpenseItem) => {
		const indexOfCategory: number = values.findIndex(
			(value: Value) => value.category.id === item.category.id
		);
		let expenseDate: number | null = null;
		if (interval === 'year') {
			if (intervalBig === null && intervalSmall !== null) {
				expenseDate = item.date.year();
			}
		} else if (interval === 'month') {
			if (intervalSmall === null) {
				expenseDate = item.date.year();
			} else {
				expenseDate = item.date.month();
			}
		}
		if (
			expenseDate === (intervalSmall !== null ? intervalSmall : intervalBig)
		) {
			if (indexOfCategory !== -1) {
				values[indexOfCategory].value += item.price[currency];
			} else {
				values.push({
					category: item.category,
					value: item.price[currency],
				});
			}
		}
	});
	return values;
};
