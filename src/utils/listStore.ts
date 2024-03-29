import { ExpenseItem } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
import { userStore } from './userStore';
import { configure } from 'mobx';
import uniqid from 'uniqid';

configure({
	enforceActions: 'never',
});

class ListStore {
	userStore;
	list: { [key: string]: ExpenseItem } = {};
	lastDeletedItemId: string = '';

	setList = (list: { [key: string]: ExpenseItem }, save: boolean = true) => {
		this.list = { ...list } || {};
		this.userStore.updateAllData({ list: this.list });
		save && this.userStore.pushDataToSaving();
	};

	addItem = (payload: ExpenseItem, id: string = uniqid()) => {
		this.setList({ ...this.list, [id]: payload });
	};

	removeItem = (id: string) => {
		const newList = this.list;
		delete newList[id];
		this.setList(newList);
		this.setLastDeletedItemId('');
	};

	setLastDeletedItemId = (id: string) => {
		this.lastDeletedItemId = id;
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

	constructor(store: typeof userStore) {
		this.userStore = store;
		makeAutoObservable(this);
	}
}

export const listStore = new ListStore(userStore);
