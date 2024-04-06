import { makeAutoObservable, reaction } from 'mobx';
import {
	ListOptions,
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
import { userStore } from './userStore';

configure({
	enforceActions: 'never',
});

const { defaultAlgorithm, darkAlgorithm } = theme;

class OptionsStore {
	userStore;
	defaultRange: number[] = [];
	listOptions: ListOptions = initialListOptions;
	debouncedListOptions: ListOptions = this.listOptions;
	statsOptions: StatsOptions = initialStatsOptions;
	userOptions: UserOptions = initialUserOptions;

	setListOptions = (options: ListOptions) => {
		userStore.setLoading(false);
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
		this.userStore.setLoading(true);
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

	setIsAccurate = (value: boolean) => {
		this.setListOptionsWithDebounce({ ...this.listOptions, isAccurate: value });
	};

	setIsStatsAccurate = (value: boolean) => {
		this.setStatsOptions({
			...this.statsOptions,
			isAccurate: value,
		});
	};

	setDeleteConfirmation = (value: boolean) => {
		this.setUserOptions({
			...this.userOptions,
			deleteConfirmation: value,
		});
	};

	constructor(UserStore: typeof userStore) {
		this.userStore = UserStore;
		makeAutoObservable(this);
	}
}

export const optionsStore = new OptionsStore(userStore);

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
