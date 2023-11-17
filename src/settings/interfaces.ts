interface category {
  id: number;
  color: string;
  name: string;
}

interface GlobalState {
  list: ExpenseItem[];
  categories: category[];
}
interface AddItemAction {
  type: 'ADD';
  newItem: ExpenseItem;
}

interface RemoveItemAction {
  type: 'REMOVE';
  itemToRemove: ExpenseItem;
}

interface ReplaceItemAction {
  type: 'REPLACE';
  itemToChange: ExpenseItem;
}

interface SetListAction {
  type: 'SET';
  newList: ExpenseItem[];
}

interface AddCategoryAction {
  type: 'ADD_CAT';
  category: category;
}

interface RemoveCategoryAction {
  type: 'REMOVE_CAT';
  category: category;
}

interface ReplaceCategoryAction {
  type: 'REPLACE_CAT';
  category: category;
}

interface SetCategoryToItem {
  type: 'SET_CAT';
  id: number;
  category: category;
}

interface ExpenseItem {
  id: number;
  date: string;
  title: string;
  category: category;
  price: currencies
}

interface currencies {
  [key: string]: number;
  USD: number;
  EUR: number;
  RUB: number;
}

interface rates {
  EUR: number;
  RUB: number;
}
