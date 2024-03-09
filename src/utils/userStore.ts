import { makeAutoObservable, reaction } from 'mobx';
import { Theme, currencies, language } from 'settings/interfaces';
import { listStore } from './listStore';
import { categoryStore } from './categoryStore';
import getData from './getData';
import constants from 'settings/constants';
import saveData from './saveData';
import { theme } from 'antd';
const { defaultAlgorithm, darkAlgorithm } = theme;

class UserStore {
	listStore;
	categoryStore;
	user: any = {};
	logged: boolean = false;
	language: language = 'en';
	currency: string = '';
	currencyRates: currencies = { RUB: 0, USD: 0, EUR: 0 };
	theme: { theme: 'default' | 'dark'; algorithm: Theme } = {
		theme: 'default',
		algorithm: defaultAlgorithm,
	};

	toggleTheme = () => {
		if (this.theme.theme === 'default') {
			this.theme.theme = 'dark';
			this.theme.algorithm = darkAlgorithm;
		} else if (this.theme.theme === 'dark') {
			this.theme.theme = 'default';
			this.theme.algorithm = defaultAlgorithm;
		}
	};

	setLogged = (value: boolean) => {
		this.logged = value;
	};

	setUser = (user: any) => {
		this.user = user;
		if (user.uid) {
			this.setLogged(true);
		}
		getData(user).then((data) => {
			if (data) {
				this.listStore.setList(data.list || []);
				this.categoryStore.setCategories(
					data.categories || [constants.defaultCategory]
				);
				this.categoryStore.setLoading(false);
				this.listStore.setLoading(false);
			}
		});
	};

	setLanguage = (language: language) => {
		this.language = language;
	};

	setCurrency = (currency: string) => {
		this.currency = currency;
		localStorage.setItem('currency', currency);
	};

	setCurrencyRates = (rates: currencies) => {
		this.currencyRates = rates;
	};

	constructor(listStore: any, categoryStore: any) {
		this.listStore = listStore;
		this.categoryStore = categoryStore;
		makeAutoObservable(this);
	}
}

export const userStore = new UserStore(listStore, categoryStore);

const save = () => {
	if (userStore.user.uid) {
		saveData(userStore.user, {
			list: userStore.listStore.list,
			categories: userStore.categoryStore.categories,
		});
	}
};

reaction(() => categoryStore.categories, save);
reaction(() => listStore.list, save);
