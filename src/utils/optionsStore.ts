import { makeAutoObservable, reaction } from 'mobx';
import {
	ListOptions,
	Mode,
	Sort,
	StatsOptions,
	Theme,
	UserOptions,
	category,
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

const { defaultAlgorithm, darkAlgorithm } = theme;

class OptionsStore {
	categoryStore;
	listOptions: ListOptions = initialListOptions;
	statsOptions: StatsOptions = initialStatsOptions;
	userOptions: UserOptions = initialUserOptions;

	resetOptions = () => {
		this.listOptions = defaultListOptions;
		this.statsOptions = defaultStatsOptions;
		this.userOptions = defaultUserOptions;
	};

	setDeleteDelay = (value: number) => {
		this.userOptions = {
			...this.userOptions,
			deleteDelay: value,
		};
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

	handleYearChanging = (values: string[]) => {
		this.listOptions = { ...this.listOptions, years: values };
	};

	handleSortAlgorithmChanging = (value: Sort) => {
		this.listOptions = { ...this.listOptions, sortingAlgorithm: value };
		this.setIsSortingReversed(false);
	};

	handleModeChanging = (value: Mode) => {
		this.listOptions = { ...this.listOptions, mode: value };
	};

	resetSettings = () => {
		this.listOptions = defaultListOptions;
	};

	setIsSortingReversed = (value: boolean) => {
		this.listOptions = { ...this.listOptions, isSortingReversed: value };
	};

	handleCategoriesToFilterChange = (values: number[]) => {
		const foundCategories: category[] = values.reduce(
			(acc: category[], value: number) => {
				const foundCategory = this.categoryStore.categories.find(
					(category: category) => category.id === value
				);
				if (foundCategory) {
					acc.push(foundCategory);
				}
				return acc;
			},
			[]
		);
		this.listOptions = {
			...this.listOptions,
			categoriesToFilter: foundCategories,
		};
	};

	handlePageChanging = (value: number, size: number) => {
		this.listOptions = { ...this.listOptions, currentPage: value };
		this.listOptions = { ...this.listOptions, pageSize: size };
	};

	setMonth = (value: number | null) => {
		this.statsOptions = { ...this.statsOptions, month: value };
	};
	setYear = (value: number | null) => {
		this.statsOptions = { ...this.statsOptions, year: value };
	};

	setDay = (value: number | null) => {
		this.statsOptions = { ...this.statsOptions, day: value };
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
		localStorage.setItem(
			'listOptions',
			JSON.stringify(optionsStore.listOptions)
		);
	}
);

reaction(
	() => optionsStore.statsOptions,
	() => {
		localStorage.setItem(
			'statsOptions',
			JSON.stringify(optionsStore.statsOptions)
		);
	}
);

reaction(
	() => optionsStore.userOptions,
	() => {
		localStorage.setItem(
			'userOptions',
			JSON.stringify(optionsStore.userOptions)
		);
	}
);
