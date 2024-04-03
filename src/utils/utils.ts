import { ExpenseItem, Sort, category, language } from 'settings/interfaces';

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
					list[next].price.USD - list[prev].price.USD
			);
			break;
		default:
			result = listKeys;
	}

	return reversed ? result.reverse() : result;
};

export const convertToJpeg: (
	base64String: string,
	quality: number
) => Promise<string> = (base64String: string, quality: number) =>
	new Promise((resolve) => {
		const img = new Image();
		img.src = base64String;
		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.width = img.width;
			canvas.height = img.height;
			ctx?.drawImage(img, 0, 0);
			const jpegBase64: string = canvas.toDataURL('image/jpeg', quality);
			resolve(jpegBase64);
		};
	});

export const getRandomColor = () => {
	const [r, g, b] = new Array(3).fill(undefined).map(() =>
		Math.floor(Math.random() * 256)
			.toString(16)
			.padStart(2, '0')
	);
	return `#${r}${g}${b}`;
};

export const getRandomCategoryId = (categories: {
	[key: string]: category;
}) => {
	const ids = Object.keys(categories);

	const randomId = ids[Math.floor(Math.random() * ids.length)];

	return categories[randomId].deleted ? '0' : randomId;
};
