import { ExpenseItem } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
import { userStore } from './userStore';
import { configure } from 'mobx';
import saveData from './saveData';
import { debounce, uniqueId } from 'lodash';
import constants from 'settings/constants';

configure({
	enforceActions: 'never',
});

class ListStore {
	userStore;
	list: { [key: string]: ExpenseItem } = {};

	saveData = () => {
		const listToSave: any = { ...this.list };
		if (this.userStore.user.uid) {
			for (const key in listToSave) {
				listToSave[key] = {
					...listToSave[key],
					date: listToSave[key].date.valueOf(),
				};
			}
			saveData(
				this.userStore.user,
				this.userStore.setStatus,
				this.userStore.decreaseRecentChanges,
				this.userStore.recentChanges,
				'list',
				listToSave
			);
		}
	};

	debouncedSaveData = debounce(this.saveData, constants.savingDelay);

	setList = (list: { [key: string]: ExpenseItem }, save: boolean = true) => {
		this.list = { ...list } || {};
		save && this.debouncedSaveData();
		save && this.userStore.increaseRecentChanges();
	};

	addItem = (payload: ExpenseItem) => {
		this.setList({ ...this.list, [uniqueId()]: payload });
	};

	removeItem = (id: string) => {
		const newList = this.list;
		delete newList[id];
		this.setList(newList);
	};

	replaceItem = (id: string, payload: ExpenseItem) => {
		this.setList({ ...this.list, [id]: payload });
	};

	clearListFromCategory = (id: string) => {
		const newList = this.list;
		for (const key in newList) {
			if (newList[key].categoryId === id) {
				newList[key].categoryId = '0';
			}
		}
		this.setList(newList);
	};

	constructor(userStore: any) {
		this.userStore = userStore;
		makeAutoObservable(this);
	}
}

export const listStore = new ListStore(userStore);
