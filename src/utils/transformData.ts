import {
	ExpenseItem,
	ListOptions,
	Value,
	category,
	language,
} from 'settings/interfaces';
import { sortBy } from './utils';

export const getFilteredList = (
	options: ListOptions,
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
	options: ListOptions,
	filteredList: ExpenseItem[]
) => {
	const { currentPage, pageSize } = options;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	return filteredList.slice(startIndex, endIndex);
};

export const getValuesForCalendar = (
	list: ExpenseItem[],
	currency: string,
	year: number | null,
	month: number | null,
	day?: number | null
) => {
	const result: number[] = new Array(day === undefined ? 12 : 31).fill(0);
	list.forEach((item: ExpenseItem) => {
		if (day === undefined) {
			if (item.date.year() === year)
				result[item.date.month()] += item.price[currency];
		} else {
			if (item.date.year() === year && item.date.month() === month)
				result[item.date.date()] += item.price[currency];
		}
	}, []);
	return result.map((value: number) => Math.round(value));
};

export const getValuesForBarDiagramByYear = (
	list: ExpenseItem[],
	currency: string
) => {
	const result: { [key: string]: number } = {};
	list.forEach((item: ExpenseItem) => {
		const key = item.date.year().toString();
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
};

export const getValuesForBarDiagramByMonth = (
	list: ExpenseItem[],
	year: number | null,
	currency: string
) => {
	const result: number[] = new Array(12).fill(0);
	list.forEach((item: ExpenseItem) => {
		if (item.date.year() === year) {
			const key = item.date.month();
			result[key] += item.price[currency];
		}
	});
	return result.map((value: number) => Math.round(value));
};

export const getValuesForPieDiagramByYear = (
	list: ExpenseItem[],
	currency: string
) => {
	const values: Value[] = [];
	list.forEach((item: ExpenseItem) => {
		const indexOfCategory: number = values.findIndex(
			(value: Value) => value.category.id === item.category.id
		);
		if (indexOfCategory !== -1) {
			values[indexOfCategory].value += item.price[currency];
		} else {
			values.push({
				category: item.category,
				value: item.price[currency],
			});
		}
	});
	return values.map((value: Value) => ({
		...value,
		value: Math.round(value.value),
	}));
};

export const getValuesForPieDiagramByMonth = (
	list: ExpenseItem[],
	year: number | null,
	month: number | null,
	currency: string
) => {
	const values: Value[] = [];
	list.forEach((item: ExpenseItem) => {
		const indexOfCategory: number = values.findIndex(
			(value: Value) => value.category.id === item.category.id
		);
		if (
			item.date.year() === year &&
			(month !== null ? item.date.month() === month : true)
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
	return values.map((value: Value) => ({
		...value,
		value: Math.round(value.value),
	}));
};

export const getValuesForPieDiagramInCurrentDay = (
	list: ExpenseItem[],
	year: number | null,
	month: number | null,
	day: number | null,
	currency: string
) => {
	const values: Value[] = [];
	list.forEach((item: ExpenseItem) => {
		const indexOfCategory: number = values.findIndex(
			(value: Value) => value.category.id === item.category.id
		);
		if (
			item.date.date() === day &&
			item.date.month() === month &&
			item.date.year() === year
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
	return values.map((value: Value) => ({
		...value,
		value: Math.round(value.value),
	}));
};
