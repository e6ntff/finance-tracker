import dayjs from 'dayjs';
import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;
export interface category {
	color: string;
	name: string;
}
export interface ExpenseItem {
	date: number;
	title: string;
	categoryId: string;
	price: currencies;
	createdAt: number;
	updatedAt?: number;
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

export type ThemeAlgorithm = typeof darkAlgorithm | typeof defaultAlgorithm;

export type Theme = 'dark' | 'default';

export type Sort = 'date' | 'title' | 'price';

export type Mode = 'list' | 'grid';

export type Interval = 'year' | 'month' | 'day';

export type currency = 'USD' | 'EUR' | 'RUB';

export interface ListOptions {
	isAccurate: boolean;
	range: number[];
	sortingAlgorithm: Sort;
	isSortingReversed: boolean;
	pageSize: number;
	currentPage: number;
	categoriesToFilterIds: string[];
	mode: Mode;
}

export interface StatsOptions {
	isAccurate: boolean;
	range: number[];
}

export interface Value {
	categoryId: string;
	value: number;
}

export interface UserOptions {
	language: language;
	currency: currency;
	theme: Theme;
	themeAlgorithm: ThemeAlgorithm;
	deleteDelay: number;
}

export type Status = 'loading' | 'success' | 'error' | null;

export interface AllData {
	list: { [key: string]: ExpenseItem };
	categories: { [key: string]: category };
}
