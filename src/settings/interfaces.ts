import dayjs from 'dayjs';
export interface category {
	id: number;
	color: string;
	name: string;
}
export interface ExpenseItem {
	id: number;
	date: dayjs.Dayjs;
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

export interface AuthUser {
	email: string;
	password: string;
	passwordAgain?: string;
}

export type language = 'en' | 'ru';
