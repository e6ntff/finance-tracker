import dayjs from 'dayjs';

const constants = {
	baseCurrency: 'USD',
	defaultCategory: {
		id: 0,
		color: '#cccccc',
		name: 'No category',
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
