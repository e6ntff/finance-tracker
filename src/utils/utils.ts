import { ExpenseItem, Sort, language } from 'settings/interfaces';

export const getSymbol = (currency: string) => {
	if (currency === 'USD') return '$';
	if (currency === 'EUR') return '€';
	if (currency === 'RUB') return '₽';
	return '';
};

export const sortBy = (
	list: ExpenseItem[],
	sortingAlgorithm: Sort,
	reversed: boolean,
	language?: language
) => {
	let result: ExpenseItem[];
	switch (sortingAlgorithm) {
		case 'date':
			result = [...list].sort(
				(prev: ExpenseItem, next: ExpenseItem) =>
					next.date.valueOf() - prev.date.valueOf()
			);
			break;
		case 'title':
			result = [...list].sort((prev: ExpenseItem, next: ExpenseItem) =>
				prev.title.localeCompare(next.title, language, {
					sensitivity: 'base',
				})
			);
			break;
		case 'price':
			result = [...list].sort(
				(prev: ExpenseItem, next: ExpenseItem) =>
					next.price.USD - prev.price.USD
			);
			break;
		default:
			result = [...list];
	}

	return reversed ? result.reverse() : result;
};
