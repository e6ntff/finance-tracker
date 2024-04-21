import dayjs from 'dayjs';
import { ListType } from './interfaces';

const pageSizeOptions = [20, 40, 80];

const defaultCategory = {
	type: 'expense' as ListType,
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
	windowBreakpoint: 850,
	maxAppWidthLarge: 1000,
	maxAppWidthSmall: 500,
	defaultPageSize: pageSizeOptions[0],
	defaultAlgoritm: 'date',
	defaultMode: 'list',
	pageSizeOptions: pageSizeOptions,
	baseCurrency: 'USD',
	startDate: dayjs(new Date(2020, 0, 1)),
	endDate: dayjs(new Date(2029, 11, 31)),
	defaultCategory: defaultCategory,
	defaultData: {
		list: {},
		categories: { '0': defaultCategory },
		goals: {},
	},
	emptyItem: {
		type: 'expense' as ListType,
		title: '',
		date: dayjs().valueOf(),
		categoryId: '0',
		price: {
			USD: 0,
			EUR: 0,
			RUB: 0,
		},
		createdAt: 0,

		deleted: false,
	},
	emptyGoal: {
		title: '',
		date: {
			start: dayjs().valueOf(),
			end: dayjs().valueOf(),
		},
		money: {
			collected: {
				USD: 0,
				RUB: 0,
				EUR: 0,
			},
			total: {
				USD: 0,
				RUB: 0,
				EUR: 0,
			},
		},
		createdAt: dayjs().valueOf(),
	},

	colors: {
		expense: '#f00',
		income: '#0a0',
		expenseLight: '#f005',
		incomeLight: '#0a05',
	},
};

export default constants;
