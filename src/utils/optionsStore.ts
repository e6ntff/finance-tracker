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
import { categoryStore } from './categoryStore';
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
	categoryStore;
	defaultRange: number[] = [];
	listOptions: ListOptions = initialListOptions;
	statsOptions: StatsOptions = initialStatsOptions;
	userOptions: UserOptions = initialUserOptions;
	deboucedListOptions: ListOptions = this.listOptions;
	deboucedStatsOptions: StatsOptions = this.statsOptions;
	deboucedUserOptions: UserOptions = this.userOptions;

	setListOptions = (options: ListOptions) => {
		this.listOptions = options;
	};

	setUserOptions = (options: UserOptions) => {
		this.userOptions = options;
	};

	setStatsOptions = (options: StatsOptions) => {
		this.statsOptions = options;
	};

	debouncedSetListOptions = debounce(
		this.setListOptions,
		constants.optionsDebounceDelay
	);
	debouncedSetUserOptions = debounce(
		this.setUserOptions,
		constants.optionsDebounceDelay
	);
	debouncedSetStatsOptions = debounce(
		this.setStatsOptions,
		constants.optionsDebounceDelay
	);

	resetOptions = () => {
		this.debouncedSetListOptions(defaultListOptions);
		this.debouncedSetStatsOptions(defaultStatsOptions);
		this.debouncedSetUserOptions(defaultUserOptions);
	};

	setTheme = (theme: Theme) => {
		this.debouncedSetUserOptions({
			...this.userOptions,
			theme: theme,
			themeAlgorithm: theme === 'default' ? defaultAlgorithm : darkAlgorithm,
		});
	};

	setLanguage = (language: language) => {
		this.debouncedSetUserOptions({ ...this.userOptions, language: language });
	};

	setCurrency = (currency: currency) => {
		this.debouncedSetUserOptions({ ...this.userOptions, currency: currency });
	};

	setRange = (values: number[]) => {
		this.debouncedSetListOptions({ ...this.listOptions, range: values });
	};

	setDefaultRange = (values: number[]) => {
		this.defaultRange = values;
	};

	handleSortAlgorithmChanging = (value: Sort) => {
		this.debouncedSetListOptions({
			...this.listOptions,
			sortingAlgorithm: value,
		});
		this.setIsSortingReversed(false);
	};

	handleModeChanging = (value: Mode) => {
		this.debouncedSetListOptions({ ...this.listOptions, mode: value });
	};

	resetListOptions = () => {
		this.debouncedSetListOptions({
			...defaultListOptions,
			mode: this.listOptions.mode,
			range: this.defaultRange,
		});
	};

	setIsSortingReversed = (value: boolean) => {
		this.debouncedSetListOptions({
			...this.listOptions,
			isSortingReversed: value,
		});
	};

	handleCategoriesToFilterChange = (values: string[]) => {
		this.debouncedSetListOptions({
			...this.listOptions,
			categoriesToFilterIds: values,
		});
	};

	handlePageChanging = (value: number, size: number) => {
		this.debouncedSetListOptions({
			...this.listOptions,
			currentPage: value,
			pageSize: size,
		});
	};

	setStatsRange = (values: number[]) => {
		this.debouncedSetStatsOptions({ ...this.statsOptions, range: values });
	};

	setIsAccurate = (value: boolean) => {
		this.debouncedSetListOptions({ ...this.listOptions, isAccurate: value });
	};

	setIsStatsAccurate = (value: boolean) => {
		this.debouncedSetStatsOptions({ ...this.statsOptions, isAccurate: value });
	};

	setDeleteConfirmation = (value: boolean) => {
		this.debouncedSetUserOptions({
			...this.userOptions,
			deleteConfirmation: value,
		});
	};

	constructor(categoryStore: any) {
		this.categoryStore = categoryStore;
		makeAutoObservable(this);
	}
}

export const optionsStore = new OptionsStore(categoryStore);

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
