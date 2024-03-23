import dayjs from 'dayjs';

const pageSizeOptions = [20, 40, 80];

const defaultCategory = {
	id: 0,
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
	savingDelay: 5000,
	emptyItem: {
		id: Math.random(),
		title: '',
		date: dayjs(),
		categoryId: defaultCategory.id,
		price: {
			USD: 0,
			EUR: 0,
			RUB: 0,
		},
	},
};

export default constants;
