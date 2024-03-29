import { makeAutoObservable } from 'mobx';
import { AllData, Status, currencies } from 'settings/interfaces';
import constants from 'settings/constants';
import { configure } from 'mobx';
import saveData from './saveData';
import { debounce } from 'lodash';

configure({
	enforceActions: 'never',
});

class UserStore {
	user: any = {};
	width: number = window.innerWidth;
	currencyRates: currencies = { RUB: 0, USD: 0, EUR: 0 };
	isSmallScreen: boolean = window.innerWidth < constants.windowBreakpoint;
	logged: boolean = false;
	loading: boolean = true;
	notificationStatus: Status = null;
	recentChanges: number = 0;
	allData: AllData = constants.defaultData;

	saveData = () => {
		if (this.user.uid) {
			saveData(
				this.user,
				this.setStatus,
				this.decreaseRecentChanges,
				this.recentChanges,
				this.allData
			);
		}
	};

	debouncedSaveData = debounce(this.saveData, constants.savingDelay);

	pushDataToSaving = (data: any) => {
		this.allData = Object.assign(this.allData, { ...data });
		this.debouncedSaveData();
		this.increaseRecentChanges();
	};

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	increaseRecentChanges = (value: number = 1) => {
		this.recentChanges += value;
	};

	decreaseRecentChanges = (value: number = 1) => {
		this.recentChanges -= value;
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
