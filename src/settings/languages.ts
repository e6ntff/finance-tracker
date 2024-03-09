const languages = {
	total: {
		en: 'Total',
		ru: 'Всего',
	},
	filterByYear: {
		en: 'Filter by year',
		ru: 'Фильтр по году',
	},
	noExpenses: {
		en: 'No expenses this year',
		ru: 'Нет расходов в этом году',
	},
	home: {
		en: 'Home',
		ru: 'Главная',
	},
	dashboard: {
		en: 'Dashboard',
		ru: 'Статистика',
	},
	expenses: {
		en: 'Expenses',
		ru: 'Расходы',
	},
	categories: {
		en: 'Categories',
		ru: 'Категории',
	},
	settings: {
		en: 'Settings',
		ru: 'Настройки',
	},
	addExpense: {
		en: 'New expense',
		ru: 'Новый расход',
	},
	title: {
		en: 'Title',
		ru: 'Название',
	},
	price: {
		en: 'Price',
		ru: 'Цена',
	},
	dateAndCat: {
		en: 'Date and category',
		ru: 'Дата и категория',
	},
	add: {
		en: 'Add',
		ru: 'Добавить',
	},
	cancel: {
		en: 'Cancel',
		ru: 'Отмена',
	},
	language: {
		en: 'Language',
		ru: 'Язык',
	},
	currency: {
		en: 'Currency',
		ru: 'Валюта',
	},
	addCat: {
		en: 'Add new category',
		ru: 'Добавить категорию',
	},
	newCat: {
		en: 'New category',
		ru: 'Новая категория',
	},
	submitCat: {
		en: 'Add',
		ru: 'Добавить',
	},
	noCategory: {
		en: 'No category',
		ru: 'Без категории',
	},
	logIn: {
		en: 'Log in',
		ru: 'Войти',
	},
	signIn: {
		en: 'Sign in',
		ru: 'Зарегистрироваться',
	},
	signOut: {
		en: 'Sign out',
		ru: 'Выйти',
	},
	invalidLogin: {
		en: 'Invalid login or password',
		ru: 'Неверный логин или пароль',
	},
	password: {
		en: 'Password',
		ru: 'Пароль',
	},
	repeatPassword: {
		en: 'Repeat password',
		ru: 'Пароль еще раз',
	},
	email: {
		en: 'E-mail',
		ru: 'E-mail',
	},
	already: {
		en: 'Already have an account?',
		ru: 'Уже есть аккаунт?',
	},
	yet: {
		en: 'Do not have an account yet?',
		ru: 'Еще нет аккаунта?',
	},
	passMatch: {
		en: 'Passwords do not match',
		ru: 'Пароли не совпадают',
	},
	expensesIn: (interval: string | null) => ({
		en: interval ? `Expenses in ${interval}` : 'All expenses',
		ru: interval ? `Расходы за ${interval}` : 'Все расходы',
	}),
	months: {
		en: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		ru: [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		],
	},
	passwordRequirements: {
		en: `● 6 - 16 symbols`,
		ru: `● 6 - 16 символов`,
	},
};

export default languages;
