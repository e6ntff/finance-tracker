interface GlobalState {
  list: ExpenseItem[];
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

interface ExpenseItem {
  id: number;
  date: string;
  title: string;
  price: {
    [key: string]: number;
    USD: number;
    EUR: number;
    RUB: number;
  };
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
