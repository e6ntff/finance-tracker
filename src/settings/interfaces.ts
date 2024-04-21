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

export interface User {
	friends: { [key: string]: true };
	friendRequests: { [key: string]: true };
	sentFriendRequests: { [key: string]: true };
	chats: { [key: string]: true };
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
}

export interface CommunityOptions {
	lastSelectedChatId: string | null;
}

export interface Status {
	status: 'loading' | 'success' | 'error';
	text?: string;
}

export interface AllData {
	list: { [key: string]: ExpenseItem };
	categories: { [key: string]: category };
	goals: { [key: string]: Goal };
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
	date: { start: number; end: number };
	money: { collected: currencies; total: currencies };
	createdAt: number;
	updatedAt?: number;
}

export type UserMode = 'requests' | 'myRequests' | 'friends';

export interface Chat {
	info: {
		title: string;
		createdAt: number;
		members: { [key: string]: true };
		lastMessage?: Message;
	};
	messages: { [key: string]: Message };
}

export interface Message {
	sender: string;
	sentAt: number;
	editedAt?: number;
	text: string;
	seenBy: { [key: string]: true };
}
