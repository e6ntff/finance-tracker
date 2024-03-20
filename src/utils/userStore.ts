import { makeAutoObservable, reaction } from 'mobx';
import { currencies } from 'settings/interfaces';
import { listStore } from './listStore';
import { categoryStore } from './categoryStore';
import getData from './getData';
import constants from 'settings/constants';
import saveData from './saveData';

class UserStore {
	listStore;
	categoryStore;
	user: any = {};
	width: number = window.innerWidth;
	currencyRates: currencies = { RUB: 0, USD: 0, EUR: 0 };
	isSmallScreen: boolean = window.innerWidth < constants.windowBreakpoint;
	logged: boolean = false;

	setWidth = (width: number, value: boolean) => {
		this.width = width;
		this.isSmallScreen = value;
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
