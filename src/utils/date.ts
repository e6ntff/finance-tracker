import dayjs from 'dayjs';
import languages from 'settings/languages';

const getTodayDate = (date: Date) => {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
};

export const getMonth = (language: 'en' | 'ru', date?: dayjs.Dayjs) => {
	if (date) {
		const index = date.month();
		return [languages.months[language][index]];
	}
	return languages.months[language];
};

export default getTodayDate;
