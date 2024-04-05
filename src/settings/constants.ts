import dayjs from 'dayjs';

const pageSizeOptions = [20, 40, 80];

const defaultCategory = {
	color: '#cccccc',
	name: '-',
	deleted: false,
};

const constants = {
	optionsDebounceDelay: 500,
	tourPeriod: 5000,
	spinDelay: 1500,
	deleteDelay: 5000,
	savingDelay: 5000,
	errorDelay: 5000,
	windowBreakpoint: 750,
	maxAppWidthLarge: 900,
	maxAppWidthSmall: 500,
	defaultPageSize: pageSizeOptions[0],
	defaultAlgoritm: 'date',
	defaultMode: 'list',
	pageSizeOptions: pageSizeOptions,
	baseCurrency: 'USD',
	startDate: dayjs(new Date(2020, 0, 1)),
	defaultCategory: defaultCategory,
	defaultData: {
		list: {},
		categories: { 0: defaultCategory },
	},
	emptyItem: {
		title: '',
		date: dayjs().valueOf(),
		categoryId: '0',
		price: {
			USD: 0,
			EUR: 0,
			RUB: 0,
		},
		createdAt: 0,
		updatedAt: 0,
		deleted: false,
	},
};

export default constants;
