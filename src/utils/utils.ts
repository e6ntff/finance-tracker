import { ExpenseItem } from 'settings/interfaces';

export const getTodayDate = (date: Date) => {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
};

export const sortByDate = (list: ExpenseItem[]) => {
	const sortedList = list.sort(
		(prev: ExpenseItem, next: ExpenseItem) =>
			next.date.valueOf() - prev.date.valueOf()
	);
	return sortedList;
};

export const getSymbol = (currency: string) => {
	if (currency === 'USD') return '$';
	if (currency === 'EUR') return '€';
	if (currency === 'RUB') return '₽';
	return '';
};
