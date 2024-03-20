import { ExpenseItem, Sort, language } from 'settings/interfaces';

export const getSymbolAndPrice = (currency: string, price?: number) => {
	let result = '';
	if (currency === 'USD') result += '$';
	if (currency === 'EUR') result += '€';
	if (currency === 'RUB') result += '₽';

	const formattedPrice = Math.round(price as number)
		?.toString()
		.split('')
		.reverse()
		.reduce(
			(acc: string[], symbol: string, index: number) =>
				index % 3 === 0 && index !== 0
					? [...acc, symbol + ',']
					: [...acc, symbol],
			[]
		)
		.reverse()
		.join('');

	return price === undefined ? result : result + formattedPrice;
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
