import { ExpenseItem } from '../settings/interfaces';

const sortByDate = (list: ExpenseItem[]) => {
	const sortedList = list.sort(
		(prev: ExpenseItem, next: ExpenseItem) =>
			next.date.valueOf() - prev.date.valueOf()
	);
	return sortedList;
};

export default sortByDate;
