import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;
export interface category {
	color: string;
	name: string;
	deleted: boolean;
	deletedAt?: number;
}
export interface ExpenseItem {
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
