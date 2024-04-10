import { makeAutoObservable, reaction } from 'mobx';
import {
	ListOptions,
	ListType,
	Mode,
	Sort,
	StatsOptions,
	Theme,
	UserOptions,
	currency,
	language,
} from 'settings/interfaces';
import { theme } from 'antd';
import {
	defaultListOptions,
	defaultStatsOptions,
	defaultUserOptions,
	initialListOptions,
	initialStatsOptions,
	initialUserOptions,
} from 'settings/options';
import { configure } from 'mobx';
import { debounce } from 'lodash';
import constants from 'settings/constants';

configure({
	enforceActions: 'never',
});

const { defaultAlgorithm, darkAlgorithm } = theme;

class OptionsStore {
	defaultRange: number[] = [];
	listOptions: ListOptions = initialListOptions;
	debouncedListOptions: ListOptions = this.listOptions;
	statsOptions: StatsOptions = initialStatsOptions;
	userOptions: UserOptions = initialUserOptions;

	setListOptions = (options: ListOptions) => {
		this.listOptions = options;
	};

	setUserOptions = (options: UserOptions) => {
		this.userOptions = options;
	};

	setStatsOptions = (options: StatsOptions) => {
		this.statsOptions = options;
	};

	setDebouncedListOptions = debounce(
		(options: ListOptions) => this.setListOptions(options),
		constants.optionsDebounceDelay
	);

	setListOptionsWithDebounce = (options: ListOptions) => {
		this.listOptions = options;

		this.setDebouncedListOptions(options);
	};

	resetOptions = () => {
		this.setListOptionsWithDebounce(defaultListOptions);
		this.setStatsOptions(defaultStatsOptions);
		this.setUserOptions(defaultUserOptions);
	};

	setTheme = (theme: Theme) => {
		this.setUserOptions({
			...this.userOptions,
			theme: theme,
			themeAlgorithm: theme === 'default' ? defaultAlgorithm : darkAlgorithm,
		});
	};

	setListType = (type: ListType) => {
		this.setListOptions({ ...this.listOptions, type: type });
	};

	setStatsType = (type: ListType) => {
		this.setStatsOptions({ ...this.statsOptions, type: type });
	};

	setLanguage = (language: language) => {
		this.setUserOptions({
			...this.userOptions,
			language: language,
		});
	};

	setCurrency = (currency: currency) => {
		this.setUserOptions({
			...this.userOptions,
			currency: currency,
		});
	};

	setRange = (values: number[]) => {
		this.setListOptionsWithDebounce({ ...this.listOptions, range: values });
	};

	setDefaultRange = (values: number[]) => {
		this.defaultRange = values;
	};

	handleSortAlgorithmChanging = (value: Sort) => {
		this.setListOptionsWithDebounce({
			...this.listOptions,
			sortingAlgorithm: value,
			isSortingReversed: false,
		});
	};

	handleModeChanging = (value: Mode) => {
		this.setListOptionsWithDebounce({ ...this.listOptions, mode: value });
	};

	resetListOptions = () => {
		this.setListOptionsWithDebounce({
			...defaultListOptions,
			mode: this.listOptions.mode,
			range: this.defaultRange,
		});
	};

	setIsSortingReversed = (value: boolean) => {
		this.setListOptionsWithDebounce({
			...this.listOptions,
			isSortingReversed: value,
		});
	};

	handleCategoriesToFilterChange = (values: string[]) => {
		this.setListOptionsWithDebounce({
			...this.listOptions,
			categoriesToFilterIds: values,
		});
	};

	handlePageChanging = (value: number, size: number) => {
		this.setListOptionsWithDebounce({
			...this.listOptions,
			currentPage: value,
			pageSize: size,
		});
	};

	setStatsRange = (values: number[]) => {
		this.setStatsOptions({ ...this.statsOptions, range: values });
	};

	setDeleteConfirmation = (value: boolean) => {
		this.setUserOptions({
			...this.userOptions,
			deleteConfirmation: value,
		});
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export const optionsStore = new OptionsStore();

reaction(
	() => optionsStore.listOptions,
	() => {
		sessionStorage.setItem(
			'listOptions',
			JSON.stringify(optionsStore.listOptions)
		);
	}
);

reaction(
	() => optionsStore.statsOptions,
	() => {
		sessionStorage.setItem(
			'statsOptions',
			JSON.stringify(optionsStore.statsOptions)
		);
	}
);

reaction(
	() => optionsStore.userOptions,
	() => {
		sessionStorage.setItem(
			'userOptions',
			JSON.stringify(optionsStore.userOptions)
		);
	}
);
