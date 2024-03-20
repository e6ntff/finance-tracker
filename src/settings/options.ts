import constants from './constants';
import {
	ListOptions,
	Mode,
	Sort,
	StatsOptions,
	UserOptions,
} from './interfaces';
import { theme } from 'antd';

const { defaultAlgorithm } = theme;

export const defaultListOptions: ListOptions = {
	years: [],
	sortingAlgorithm: constants.defaultAlgoritm as Sort,
	isSortingReversed: false,
	pageSize: constants.defaultPageSize,
	currentPage: 1,
	categoriesToFilter: [],
	mode: constants.defaultMode as Mode,
};

export const initialListOptions: ListOptions = JSON.parse(
	localStorage.getItem('listOptions') || JSON.stringify(defaultListOptions)
);

export const defaultStatsOptions: StatsOptions = {
	year: null,
	month: null,
	day: null,
};

export const initialStatsOptions: StatsOptions = JSON.parse(
	localStorage.getItem('statsOptions') || JSON.stringify(defaultStatsOptions)
);

export const defaultUserOptions: UserOptions = {
	language: 'en',
	currency: 'USD',
	theme: 'default',
	themeAlgorithm: defaultAlgorithm,
};

export const initialUserOptions: UserOptions = JSON.parse(
	localStorage.getItem('userOptions') || JSON.stringify(defaultUserOptions)
);
