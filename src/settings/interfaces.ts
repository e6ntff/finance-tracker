import dayjs from 'dayjs';
import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;
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
export interface AuthUser<T> {
	email: T;
	password: T;
	passwordAgain?: T;
}

export type language = 'en' | 'ru';

export type Theme = typeof darkAlgorithm | typeof defaultAlgorithm;
