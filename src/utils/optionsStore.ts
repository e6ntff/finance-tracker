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

configure({
	enforceActions: 'never',
});

const { defaultAlgorithm, darkAlgorithm } = theme;

class OptionsStore {
	categoryStore;
	listOptions: ListOptions = initialListOptions;
	statsOptions: StatsOptions = initialStatsOptions;
	userOptions: UserOptions = initialUserOptions;
	defaultRange: number[] = [];

	resetOptions = () => {
		this.listOptions = defaultListOptions;
		this.statsOptions = defaultStatsOptions;
		this.userOptions = defaultUserOptions;
	};

	setTheme = (theme: Theme) => {
		this.userOptions = {
			...this.userOptions,
			theme: theme,
			themeAlgorithm: theme === 'default' ? defaultAlgorithm : darkAlgorithm,
		};
	};

	setLanguage = (language: language) => {
		this.userOptions = { ...this.userOptions, language: language };
	};

	setCurrency = (currency: currency) => {
		this.userOptions = { ...this.userOptions, currency: currency };
	};

	setRange = (values: number[]) => {
		this.listOptions = { ...this.listOptions, range: values };
	};

	setDefaultRange = (values: number[]) => {
		this.defaultRange = values;
	};

	handleSortAlgorithmChanging = (value: Sort) => {
		this.listOptions = { ...this.listOptions, sortingAlgorithm: value };
		this.setIsSortingReversed(false);
	};

	handleModeChanging = (value: Mode) => {
		this.listOptions = { ...this.listOptions, mode: value };
	};

	resetListOptions = () => {
		this.listOptions = {
			...defaultListOptions,
			mode: this.listOptions.mode,
			range: this.defaultRange,
		};
	};

	setIsSortingReversed = (value: boolean) => {
		this.listOptions = { ...this.listOptions, isSortingReversed: value };
	};

	handleCategoriesToFilterChange = (values: string[]) => {
		this.listOptions = {
			...this.listOptions,
			categoriesToFilterIds: values,
		};
	};

	handlePageChanging = (value: number, size: number) => {
		this.listOptions = {
			...this.listOptions,
			currentPage: value,
			pageSize: size,
		};
	};

	setStatsRange = (values: number[]) => {
		this.statsOptions = { ...this.statsOptions, range: values };
	};

	setIsAccurate = (value: boolean) => {
		this.listOptions = { ...this.listOptions, isAccurate: value };
	};

	setIsStatsAccurate = (value: boolean) => {
		this.statsOptions = { ...this.statsOptions, isAccurate: value };
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
