import { makeAutoObservable, reaction } from 'mobx';
import {
	CommunityOptions,
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
	initialCommunityOptions,
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
	defaultRange: number[] = [];
	listOptions: ListOptions = initialListOptions;
	statsOptions: StatsOptions = initialStatsOptions;
	userOptions: UserOptions = initialUserOptions;
	communityOptions: CommunityOptions = initialCommunityOptions;

	setLastSelectedChatId = (chatId: string | null) => {
		this.setCommunityOptions({
			...this.communityOptions,
			lastSelectedChatId: chatId,
		});
	};

	setListOptions = (options: ListOptions) => {
		this.listOptions = options;
	};

	setUserOptions = (options: UserOptions) => {
		this.userOptions = options;
	};

	setStatsOptions = (options: StatsOptions) => {
		this.statsOptions = options;
	};

	setCommunityOptions = (options: CommunityOptions) => {
		this.communityOptions = options;
	};

	resetOptions = () => {
		this.setListOptions(defaultListOptions);
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
		this.setListOptions({ ...this.listOptions, range: values });
	};

	setDefaultRange = (values: number[]) => {
		this.defaultRange = values;
	};

	handleSortAlgorithmChanging = (value: Sort) => {
		this.setListOptions({
			...this.listOptions,
			sortingAlgorithm: value,
			isSortingReversed: false,
		});
	};

	handleModeChanging = (value: Mode) => {
		this.setListOptions({ ...this.listOptions, mode: value });
	};

	resetListOptions = () => {
		this.setListOptions({
			...defaultListOptions,
			mode: this.listOptions.mode,
			range: this.defaultRange,
		});
	};

	setIsSortingReversed = (value: boolean) => {
		this.setListOptions({
			...this.listOptions,
			isSortingReversed: value,
		});
	};

	handleCategoriesToFilterChange = (values: string[]) => {
		this.setListOptions({
			...this.listOptions,
			categoriesToFilterIds: values,
		});
	};

	handlePageChanging = (value: number, size: number) => {
		this.setListOptions({
			...this.listOptions,
			currentPage: value,
			pageSize: size,
		});
	};

	setStatsRange = (values: number[]) => {
		this.setStatsOptions({ ...this.statsOptions, range: values });
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

reaction(
	() => optionsStore.communityOptions,
	() => {
		sessionStorage.setItem(
			'communityOptions',
			JSON.stringify(optionsStore.communityOptions)
		);
	}
);
