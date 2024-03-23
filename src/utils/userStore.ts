import { makeAutoObservable } from 'mobx';
import { AllData, Status, currencies } from 'settings/interfaces';
import constants from 'settings/constants';
import saveData from './saveData';
import { configure } from 'mobx';
import { debounce } from 'lodash';

configure({
	enforceActions: 'never',
});

class UserStore {
	allData: AllData = {
		list: [],
		categories: [],
	};
	user: any = {};
	width: number = window.innerWidth;
	currencyRates: currencies = { RUB: 0, USD: 0, EUR: 0 };
	isSmallScreen: boolean = window.innerWidth < constants.windowBreakpoint;
	logged: boolean = false;
	notificationStatus: Status = null;

	debouncedSaveData = debounce(saveData, constants.savingDelay);

	setAllData = (data: AllData, save: boolean = true) => {
		this.allData = Object.assign(this.allData, data);
		if (userStore.user.uid && save) {
			this.debouncedSaveData(userStore.user, this.allData, userStore.setStatus);
		}
	};

	setStatus = (status: Status) => {
		this.notificationStatus = status;
		if (status) setTimeout(() => this.setStatus(null));
	};

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
	};

	setCurrencyRates = (rates: currencies) => {
		this.currencyRates = rates;
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export const userStore = new UserStore();
