interface ExpenseItem {
  id: number;
  date: string;
  title: string;
  price: {
    USD: number;
    EUR: number;
    RUB: number;
  };
}

interface currencies {
  USD: number;
  EUR: number;
  RUB: number;
}

interface rates {
  EUR: number;
  RUB: number;
}
