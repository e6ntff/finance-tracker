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
	list: { [key: string]: ExpenseItem },
	listKeys: string[],
	sortingAlgorithm: Sort,
	reversed: boolean,
	language?: language
) => {
	let result: string[];
	switch (sortingAlgorithm) {
		case 'date':
			result = listKeys.sort(
				(prev: string, next: string) =>
					list[next].date.valueOf() - list[prev].date.valueOf()
			);
			break;
		case 'title':
			result = listKeys.sort((prev: string, next: string) =>
				list[prev].title.localeCompare(list[next].title, language, {
					sensitivity: 'base',
				})
			);
			break;
		case 'price':
			result = listKeys.sort(
				(prev: string, next: string) =>
					list[Number(next)].price.USD - list[Number(prev)].price.USD
			);
			break;
		default:
			result = listKeys;
	}

	return reversed ? result.reverse() : result;
};
