import {
	ExpenseItem,
	Interval,
	ItemWithSearch,
	ListOptions,
	ListType,
	Value,
	category,
	language,
	rates,
} from 'settings/interfaces';
import { getRandomCategoryId, getRandomColor, search, sortBy } from './utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import constants from 'settings/constants';
import uniqid from 'uniqid';
import calculatePrices from './calculatePrices';

dayjs.extend(isBetween);

export const getFilteredListIds = (
	options: ListOptions,
	list: { [key: string]: ExpenseItem },
	language: language,
	query: string
) => {
	const {
		range,
		categoriesToFilterIds,
		sortingAlgorithm,
		isSortingReversed,
		type,
	} = options;

	const filteredList: ItemWithSearch[] = Object.keys(list)
		.map((key: string) => ({
			id: key,
			overlaps: search(query, list[key].title),
		}))
		.filter((value: ItemWithSearch) => {
			const item = list[value.id];
			return (
				(item.type === type || type === 'all') &&
				(value.overlaps ? value.overlaps.length : true) &&
				!item.deleted &&
				item.date >= range[0] &&
				item.date <= range[1] &&
				(categoriesToFilterIds.length
					? categoriesToFilterIds.some((id: string) => item.categoryId === id)
					: true)
			);
		});
	return sortBy(
		list,
		filteredList,
		sortingAlgorithm,
		isSortingReversed,
		language
	);
};

export const getListToShowOnCurrentPageIds = (
	options: ListOptions,
	filteredListIds: ItemWithSearch[]
) => {
	const { currentPage, pageSize } = options;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	return filteredListIds.slice(startIndex, endIndex);
};

export const getValuesForBarDiagram = (
	list: { [key: string]: ExpenseItem },
	type: ListType,
	currency: string,
	mode: Interval,
	year: number
) => {
	const keys = Object.keys(list).filter(
		(key: string) => list[key].type === type
	);
	if (mode === 'year') {
		const result: { [key: number]: number } = {};
		keys.forEach((key: string) => {
			const resultKey: number = dayjs(list[key].date).year();
			if (result[resultKey] === undefined) {
				result[resultKey] = list[key].price[currency];
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
		keys.forEach((key: string) => {
			if (dayjs(list[key].date).year() === year) {
				const index: number = dayjs(list[key].date).month();
				result[index] += list[key].price[currency];
			}
		});

		return result.map((item: number) => Math.round(item));
	}
	return [];
};

export const getValuesForPieDiagram = (
	list: { [key: string]: ExpenseItem },
	type: ListType,
	range: number[],
	currency: string
) => {
	const values: Value[] = [];

	const keys = Object.keys(list).filter(
		(key: string) => list[key].type === type
	);

	keys.forEach((key: string) => {
		if (list[key].date > range[0] && list[key].date < range[1]) {
			const categoryKey: number = Object.keys(values).findIndex(
				(index: string) =>
					values[Number(index)].categoryId === list[key].categoryId
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
	type: ListType,
	range: number[],
	currency: string
) =>
	Math.floor(
		Object.values(list).reduce((acc: number, item: ExpenseItem) => {
			if (
				item.date >= range[0] &&
				item.date <= range[1] &&
				item.type === type
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
		const itemsInMonth = Object.values(list).filter(
			// eslint-disable-next-line
			(item: ExpenseItem) =>
				item.date > startDate.valueOf() && item.date < endDate.valueOf()
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

const expense = [
	'Rent',
	'Groceries',
	'Utilities',
	'Transportation',
	'Dining Out',
	'Entertainment',
	'Healthcare',
	'Education',
	'Clothing',
	'Miscellaneous',
	'Phone Bill',
	'Internet Bill',
	'Insurance',
	'Gasoline',
	'Car Maintenance',
	'Public Transport',
	'Coffee',
	'Snacks',
	'Gym Membership',
	'Streaming Services',
	'Books',
	'Magazines',
	'Home Repairs',
	'Subscriptions',
	'Charity Donations',
	'Pet Expenses',
	'Home Decor',
	'Travel Expenses',
	'Parking Fees',
	'Car Loan',
	'Credit Card Payments',
	'Movie Tickets',
	'Concert Tickets',
	'Fitness Classes',
	'Hobbies',
	'Gifts',
	'Eating Out',
	'Alcohol',
	'Tuition Fees',
	'Stationery',
	'Haircuts',
	'Laundry',
	'Taxes',
	'Utilities',
	'Medical Bills',
	'Dental Care',
	'Home Insurance',
	'Property Taxes',
];

const income = [
	'Salary',
	'Rent income',
	'Investment income',
	'Sales',
	'Gifts',
	'Freelancing',
	'Dividends',
	'Royalties',
	'Commissions',
	'Grants',
];

export const getRandomData = (
	itemsValue: { expense: number; income: number },
	categoriesValue: { expense: number; income: number },
	deletedItemsValue: { expense: number; income: number },
	deletedCategoriesValue: { expense: number; income: number },
	currencyRates: rates
) => {
	const newItemsIncome: { [key: string]: ExpenseItem } = {};
	const newItemsExpense: { [key: string]: ExpenseItem } = {};
	const newCategoriesIncome: { [key: string]: category } = {
		'0': constants.defaultCategory,
	};
	const newCategoriesExpense: { [key: string]: category } = {
		'0': constants.defaultCategory,
	};

	new Array(categoriesValue.income)
		.fill(undefined)
		.forEach((_: undefined, index: number) => {
			const id = uniqid();

			const name = `Income category ${index}`;

			const color = getRandomColor();

			newCategoriesIncome[id] = {
				type: 'income',
				name: name,
				color: color,
				deleted:
					categoriesValue.income - index - 1 < deletedCategoriesValue.income,
			};
		});

	new Array(categoriesValue.expense)
		.fill(undefined)
		.forEach((_: undefined, index: number) => {
			const id = uniqid();

			const name = `Expense category ${index}`;

			const color = getRandomColor();

			newCategoriesExpense[id] = {
				type: 'expense',
				name: name,
				color: color,
				deleted:
					categoriesValue.expense - index - 1 < deletedCategoriesValue.expense,
			};
		});

	new Array(itemsValue.expense)
		.fill(undefined)
		.forEach((_: undefined, index: number) => {
			const categoryId = getRandomCategoryId(newCategoriesExpense);

			const title: string = expense[Math.floor(Math.random() * expense.length)];

			const date: number =
				Math.random() *
					(dayjs('2023-12-31').valueOf() - dayjs('2021-01-01').valueOf()) +
				dayjs('2021-01-01').valueOf();

			const prices = calculatePrices(
				{ USD: Math.random() * 1501, EUR: 0, RUB: 0 },
				currencyRates,
				'USD'
			);

			const id = uniqid();

			newItemsExpense[id] = {
				type: 'expense',
				deleted: index < deletedItemsValue.expense,
				title: title,
				price: prices,
				categoryId: categoryId,
				date: date,
				createdAt: date,
			};
		});

	new Array(itemsValue.income)
		.fill(undefined)
		.forEach((_: undefined, index: number) => {
			const categoryId = getRandomCategoryId(newCategoriesIncome);

			const title: string = income[Math.floor(Math.random() * income.length)];

			const date: number =
				Math.random() *
					(dayjs('2023-12-31').valueOf() - dayjs('2020-01-01').valueOf()) +
				dayjs('2020-01-01').valueOf();

			const prices = calculatePrices(
				{ USD: Math.random() * 1501, EUR: 0, RUB: 0 },
				currencyRates,
				'USD'
			);

			const id = uniqid();

			newItemsIncome[id] = {
				type: 'income',
				deleted: index < deletedItemsValue.income,
				title: title,
				price: prices,
				categoryId: categoryId,
				date: date,
				createdAt: date,
			};
		});

	return {
		items: { ...newItemsExpense, ...newItemsIncome },
		categories: { ...newCategoriesExpense, ...newCategoriesIncome },
	};
};
