import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export type ListType = 'income' | 'expense' | 'all';

export interface category {
	type: ListType;
	color: string;
	name: string;
	deleted: boolean;
	deletedAt?: number;
}

export interface ExpenseItem {
	type: ListType;
	date: number;
	title: string;
	categoryId: string;
	price: currencies;
	image?: string;
	createdAt: number;
	updatedAt?: number;
	deleted: boolean;
	deletedAt?: number;
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

export type Interval = 'year' | 'month';

export type currency = 'USD' | 'EUR' | 'RUB';

export interface ListOptions {
	type: ListType;
	range: number[];
	sortingAlgorithm: Sort;
	isSortingReversed: boolean;
	pageSize: number;
	currentPage: number;
	categoriesToFilterIds: string[];
	mode: Mode;
}

export interface StatsOptions {
	type: ListType;
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
	deleteConfirmation: boolean;
}

export interface Status {
	status: 'loading' | 'success' | 'error';
	text?: string;
}

export interface AllData {
	list: { [key: string]: ExpenseItem };
	categories: { [key: string]: category };
}

export interface TourStep {
	ref: React.MutableRefObject<null>;
	page: string;
	step: {
		title: string;
		description: string;
	};
}

export interface ItemWithSearch {
	id: string;
	overlaps: number[][] | undefined;
}

export interface Goal {
	title: string;
	image?: string;
	startDate: number;
	endDate: number
	collected: currencies;
	amount: currencies;
	createdAt: number;
	updatedAt?: number;
	deleted?: boolean;
	deletedAt?: number;
}
