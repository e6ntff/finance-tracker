interface category {
  id: number;
  color: string;
  name: string;
}

interface GlobalState {
  list: ExpenseItem[];
  categories: category[];
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
