import { makeAutoObservable } from 'mobx';
import { AllData, Status, currencies } from 'settings/interfaces';
import constants from 'settings/constants';
import { configure } from 'mobx';
import saveData from './saveData';
import { debounce } from 'lodash';
import { communityStore } from './communityStore';

configure({
	enforceActions: 'never',
});

class UserStore {
	communityStore;
	UID: string = '';
	currencyRates: currencies = { RUB: 0, USD: 0, EUR: 0 };
	isSmallScreen: boolean = window.innerWidth < constants.windowBreakpoint;
	logged: boolean = false;
	loading: boolean = true;
	notificationStatus: Status = { status: 'success' };
	isDataChanged: boolean = false;
	allData: AllData = constants.defaultData;
	tourRefs: React.MutableRefObject<null>[] = [];
	isTourStarted: boolean = false;
	isNicknameModalOpened: boolean = false;

	setIsNicknameModalOpened = (value: boolean) => {
		this.isNicknameModalOpened = value;
	};

	setIsTourStarted = (value: boolean) => {
		if (this.communityStore.myUser.id) this.isTourStarted = value;
	};

	setTourRefs = (refs: React.MutableRefObject<null>[]) => {
		this.tourRefs = refs;
	};

	saveData = () => {
		if (this.UID) {
			saveData(this.UID, this.setStatus, this.setIsDataChanged, this.allData);
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

	setUID = (UID: string) => {
		this.UID = UID;
		if (UID) {
			this.setLogged(true);
		}
	};

	setCurrencyRates = (rates: currencies) => {
		this.currencyRates = rates;
	};

	constructor(CommunityStore: typeof communityStore) {
		this.communityStore = CommunityStore;
		makeAutoObservable(this);
	}
}

export const userStore = new UserStore(communityStore);
