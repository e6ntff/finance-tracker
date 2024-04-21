const languages: { [key: string]: any } = {
	stats: {
		en: 'Stats',
		ru: 'Статистика',
	},
	list: {
		en: 'List',
		ru: 'Список',
	},
	categories: {
		en: 'Categories',
		ru: 'Категории',
	},
	goals: { en: 'Goals', ru: 'Цели' },
	community: { en: 'Community', ru: 'Сообщество' },
	friends: { en: 'Friends', ru: 'Друзья' },
	chats: { en: 'Chats', ru: 'Чаты' },
	profile: { en: 'Profile', ru: 'Профиль' },
	trash: {
		en: 'Trash',
		ru: 'Корзина',
	},
	theme: {
		en: 'Theme',
		ru: 'Тема',
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
	image: {
		en: 'Image',
		ru: 'Картинка',
	},
	language: {
		en: 'Language',
		ru: 'Язык',
	},
	currency: {
		en: 'Currency',
		ru: 'Валюта',
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
		ru: 'Электронная почта',
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
	logIn: {
		en: 'Log in',
		ru: 'Войти',
	},
	logOut: {
		en: 'Log out',
		ru: 'Выйти',
	},
	signIn: {
		en: 'Sign in',
		ru: 'Зарегистрироваться',
	},
	In: {
		en: `In`,
		ru: `За`,
	},
	total: {
		en: `Total`,
		ru: `Всего`,
	},
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
	type: { en: 'Type', ru: 'Тип' },
	noTitle: {
		en: 'No title',
		ru: 'Нет названия',
	},
	createdAt: {
		en: 'Created at',
		ru: 'Создано:',
	},
	updatedAt: {
		en: 'Updated at',
		ru: 'Обновлено:',
	},
	itemsDeleted: {
		en: 'Items deleted',
		ru: 'Расходов удалено',
	},
	categoriesDeleted: {
		en: 'Categories deleted',
		ru: 'Категорий удалено',
	},
	goalsDeleted: {
		en: 'Goals deleted',
		ru: 'Целей удалено',
	},
	itemsWithCurrentCategory: {
		en: 'Items',
		ru: 'Расходов',
	},
	offline: {
		en: `You're offline`,
		ru: 'Нет интернета',
	},
	online: {
		en: 'Back online',
		ru: 'Интернет появился',
	},
	error: {
		en: 'Error',
		ru: 'Ошибка',
	},
	processing: {
		en: 'Processing...',
		ru: 'В процессе...',
	},
	success: {
		en: 'Up to date',
		ru: 'Обновлено',
	},
	gitHub: {
		en: 'GitHub',
		ru: 'GitHub',
	},
	newItem: {
		en: 'New item',
		ru: 'новый расход',
	},
	categoriesSelect: {
		en: 'Categories select',
		ru: 'Выбор категорий',
	},
	sort: {
		reverse: {
			en: 'Reverse',
			ru: 'Развернуть',
		},
		byDate: {
			en: 'By date',
			ru: 'По дате',
		},
		byTitle: {
			en: 'By title',
			ru: 'По названию',
		},
		byPrice: {
			en: 'By price',
			ru: 'По цене',
		},
	},
	layout: {
		list: {
			en: 'List',
			ru: 'Список',
		},
		grid: {
			en: 'Grid',
			ru: 'Сетка',
		},
	},
	reset: {
		en: 'Reset',
		ru: 'Сбросить',
	},
	delete: {
		en: 'Delete',
		ru: 'Удалить',
	},
	edit: {
		en: 'Edit',
		ru: 'Редактировать',
	},
	byMonth: {
		en: 'By month',
		ru: 'Месяцы',
	},
	byDay: {
		en: 'By day',
		ru: 'Дни',
	},
	undo: {
		en: 'Undo',
		ru: 'Отменить',
	},
	removeAll: {
		en: 'Remove all',
		ru: 'Удалить все',
	},
	removeAllConfirm: {
		en: 'This will remove all your data! Are you sure?',
		ru: 'Все данные будут удалены. Вы уверены?',
	},
	noImage: {
		en: 'No image',
		ru: 'Нет картинки',
	},
	deletedAt: {
		en: 'Deleted at',
		ru: 'Удален:',
	},
	restore: {
		en: 'Restore',
		ru: 'Восстановить',
	},
	deleteAll: { en: 'Delete all', ru: 'Удалить все' },
	restoreAll: { en: 'Restore all', ru: 'Восстановить все' },
	deleteAllConfirm: {
		en: 'This will delete all forever! Are you sure?',
		ru: 'Все предметы удалятся навсегда! Вы уверены?',
	},
	restoreAllConfirm: { en: 'Restore all?', ru: 'Восстановить все?' },
	deleteConfirmation: {
		en: 'Delete confirmation',
		ru: 'Подтверждение удаления',
	},
	pickColor: {
		en: 'Pick color',
		ru: 'Выбрать цвет',
	},
	randomize: {
		en: `Add random data`,
		ru: 'Случайные данные',
	},
	randomizeConfirm: {
		en: 'All your data will be lost!',
		ru: 'Все данные будут потеряны!',
	},
	deleteSelected: { en: 'Delete selected', ru: 'Удалить выделенное' },
	restoreSelected: { en: 'Restore selected', ru: 'Восстановить выделенное' },
	runTour: { en: 'Run tour', ru: 'Запустить тур' },
	tour: [
		{
			en: {
				title: 'Hi there!',
				description:
					'This is my pet project. Here you can manage your expenses',
			},
			ru: {
				title: 'Привет!',
				description:
					'Это мой проект, где ты можешь контролировать свои расходы',
			},
		},
		{
			en: {
				title: 'This is expense list',
				description: 'You can add, remove or edit items',
			},
			ru: {
				title: 'Это список расходов',
				description: 'Ты можешь добавлять, удалять и изменять элементы',
			},
		},
		{
			en: {
				title: 'Selectors',
				description:
					'Choose categories, time interval, list type, change sorting method and search - here',
			},
			ru: {
				title: 'Управление',
				description:
					'Выбор категорий, интервала времени, типа списка, вида сортировки или поиск - все здесь',
			},
		},
		{
			en: {
				title: 'Here are categories',
				description:
					'You can add, remove and edit them. They will help you manage your money more effective',
			},
			ru: {
				title: 'Это категории',
				description:
					'Ты можешь их создавать, удалять или редактировать. Они помогут тебе управлять расходами удобнее',
			},
		},
		{
			en: {
				title: 'This is trash',
				description: `All deleted items you'll find there. You can delete forever or restore them`,
			},
			ru: {
				title: 'Корзина',
				description:
					'Все удаленные предметы ты найдешь здесь. Ты можешь удалить их навсегда или восстановить',
			},
		},
		{
			en: {
				title: 'Trash buttons',
				description:
					'To easily delete or restore all the items from trash and search there are this buttons',
			},
			ru: {
				title: 'Корзина',
				description:
					'Это кнопки для быстрого удаления и восстановления всех предметов и поиска по корзине',
			},
		},
		{
			en: {
				title: 'Settings',
				description: `You can change the app options like you want. App language, currency, theme and other take place here. Also you can restart this tour if it's needed`,
			},
			ru: {
				title: 'Настройки',
				description:
					'Ты можешь изменять настройки приложения, как хочешь. Язык, валюта, тема и другое - здесь. Здесь можно и перезапустить этот тур, если нужно',
			},
		},
		{
			en: {
				title: `It's statistic`,
				description:
					'Here you can find beautiful diagrams. Left diagram will show you expenses in choosen interval and the right one will split them into categories',
			},
			ru: {
				title: 'Это статистика',
				description:
					'Здесь ты можешь найти красивые диаграммы. Левая покажет расходы в выбранном интервале, правая - разделит их на категории',
			},
		},
		{
			en: {
				title: 'Choose time interval',
				description: 'With this slider',
			},
			ru: {
				title: 'Выбор временного интервала',
				description: 'С помощью этого ползунка',
			},
		},
		{
			en: {
				title: 'Header buttons',
				description:
					'Load the data snippet (just to look at the app), log out or check my social media',
			},
			ru: {
				title: 'Кнопки наверху',
				description:
					'Чтобы загрузить рандомные данные (посмотреть на приложение), выйти из аккаунта или перейти по моим ссылкам',
			},
		},
	],
	nickname: { en: 'Nickname', ru: 'Имя' },
	nicknameInUse: { en: 'Nickname is already in use', ru: 'Имя занято' },
	newGoal: { en: 'New Goal', ru: 'Новая цель' },
	sendRequest: { en: 'Send Request', ru: 'Пригласить' },
	requests: { en: 'Requests', ru: 'Приглашения' },
	myRequests: { en: 'My requests', ru: 'Мои приглашения' },
	alreadyFriends: { en: `You're friends`, ru: 'Вы друзья' },
	searchFriends: { en: 'Search friends', ru: 'Искать друзей' },
	createChat: { en: 'Create chat', ru: 'Создать чат' },
	deleteChatConfirm: { en: 'Delete chat?', ru: 'Удалить чат?' },
	exitChatConfirm: { en: 'Exit chat?', ru: 'Покинуть чат?' },
	acceptRequestConfirm: { en: 'Accept?', ru: 'Принять?' },
	declineRequestConfirm: { en: 'Decline?', ru: 'Отклонить?' },
	cancelRequestConfirm: { en: 'Cancel?', ru: 'Отменить?' },
	removeFriendConfirm: { en: 'Remove friend?', ru: 'Удалить из друзей?' },
};

export default languages;
