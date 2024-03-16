import dayjs from 'dayjs';

const pageSizeOptions = [18, 36, 54, 72, 90];

const constants = {
	spinDelay: 1500,
	deleteDelay: 1000,
	windowBreakpoint: 768,
	defaultPageSize: pageSizeOptions[0],
	defaultAlgoritm: 'date',
	defaultMode: 'list',
	pageSizeOptions: pageSizeOptions,
	baseCurrency: 'USD',
	defaultCategory: {
		id: 0,
		color: '#cccccc',
		name: 'Other',
	},
	getEmptyItem: (getTodayDate: (date: Date) => string) => ({
		id: Math.random(),
		title: '',
		date: dayjs(getTodayDate(new Date())),
		category: constants.defaultCategory,
		price: {
			USD: 0,
			EUR: 0,
			RUB: 0,
		},
	}),
};

export default constants;
