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
	recentChanges: number = 0;

	increaseRecentChanges = (value: number = 1) => {
		this.recentChanges += value;
		console.log('increase')
	};

	decreaseRecentChanges = (value: number = 1) => {
		this.recentChanges -= value;
	};

	saveAllData = () => {
		if (userStore.user.uid) {
			saveData(
				userStore.user,
				this.allData,
				userStore.setStatus,
				this.decreaseRecentChanges,
				this.recentChanges
			);
		}
	};

	debouncedSaveData = debounce(this.saveAllData, constants.savingDelay);

	setAllData = (data: AllData, save: boolean = true) => {
		this.allData = Object.assign(this.allData, data);
		save && this.debouncedSaveData();
		save && this.increaseRecentChanges();
		console.log('setting data')
	};

	setStatus = (status: Status) => {
		this.notificationStatus = status;
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
