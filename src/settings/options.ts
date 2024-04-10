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
	type: 'all',
	range: [],
	sortingAlgorithm: constants.defaultAlgoritm as Sort,
	isSortingReversed: false,
	pageSize: constants.defaultPageSize,
	currentPage: 1,
	categoriesToFilterIds: [],
	mode: constants.defaultMode as Mode,
};

export const initialListOptions: ListOptions = JSON.parse(
	sessionStorage.getItem('listOptions') || JSON.stringify(defaultListOptions)
);

export const defaultStatsOptions: StatsOptions = {
	type: 'income',
	range: [],
};

export const initialStatsOptions: StatsOptions = JSON.parse(
	sessionStorage.getItem('statsOptions') || JSON.stringify(defaultStatsOptions)
);

export const defaultUserOptions: UserOptions = {
	language: 'en',
	currency: 'USD',
	theme: 'default',
	themeAlgorithm: defaultAlgorithm,
	deleteConfirmation: true,
};

export const initialUserOptions: UserOptions = JSON.parse(
	sessionStorage.getItem('userOptions') || JSON.stringify(defaultUserOptions)
);
