import { ExpenseItem } from '../settings/interfaces';

const sortByDate = (list: ExpenseItem[]) => {
  const sortedList = list.sort(
    (prev: ExpenseItem, next: ExpenseItem) =>
      new Date(next.date).getTime() - new Date(prev.date).getTime()
  );
  return sortedList;
};

export default sortByDate;
