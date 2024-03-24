import dayjs from 'dayjs';

const pageSizeOptions = [20, 40, 80];

const defaultCategory = {
	color: '#cccccc',
	name: 'Other',
};

const constants = {
	spinDelay: 1500,
	deleteDelay: 1000,
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
	savingDelay: 5000,
	emptyItem: {
		title: '',
		date: dayjs().valueOf(),
		categoryId: '0',
		price: {
			USD: 0,
			EUR: 0,
			RUB: 0,
		},
	},
};

export default constants;
