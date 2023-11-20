export interface category {
  id: number;
  color: string;
  name: string;
}

export interface GlobalState {
  list: ExpenseItem[];
  categories: category[];
}

export interface ExpenseItem {
  id: number;
  date: string;
  title: string;
  category: category;
  price: currencies;
}

export interface currencies {
  [key: string]: number;
  USD: number;
  EUR: number;
  RUB: number;
}

export interface rates {
  EUR: number;
  RUB: number;
}

export interface User {
  username: string;
  password: string;
}
