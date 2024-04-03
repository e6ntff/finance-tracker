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
	currencyRates: currencies = { RUB: 0, USD: 0, EUR: 0 };
	isSmallScreen: boolean = window.innerWidth < constants.windowBreakpoint;
	logged: boolean = false;
	loading: boolean = true;
	notificationStatus: Status = { status: 'success' };
	isDataChanged: boolean = false;
	allData: AllData = constants.defaultData;
	tourRefs: React.MutableRefObject<null>[] = [];
	isTourStarted: boolean = false;

	setIsTourStarted = (value: boolean) => {
		this.isTourStarted = value;
	};

	setTourRefs = (refs: React.MutableRefObject<null>[]) => {
		this.tourRefs = refs;
	};

	saveData = () => {
		if (this.user.uid) {
			saveData(this.user, this.setStatus, this.setIsDataChanged, this.allData);
		}
	};

	debouncedSaveData = debounce(this.saveData, constants.savingDelay);

	pushDataToSaving = () => {
		this.debouncedSaveData();
		this.setIsDataChanged(true);
	};

	updateAllData = (data: any) => {
		this.allData = { ...this.allData, ...data };
	};

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setIsDataChanged = (value: boolean) => {
		this.isDataChanged = value;
	};

	setStatus = (status: Status) => {
		this.notificationStatus = status;
	};

	setIsSmallScreen = (value: boolean) => {
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
