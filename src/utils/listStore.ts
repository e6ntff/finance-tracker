import { ExpenseItem } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
import { userStore } from './userStore';
import { configure } from 'mobx';
import uniqid from 'uniqid';
import dayjs from 'dayjs';

configure({
	enforceActions: 'never',
});

class ListStore {
	userStore;
	list: { [key: string]: ExpenseItem } = {};
	lastDeletedItemIds: string[] = [];
	listTemplate: typeof this.list = {};

	setListTemplate = (template: typeof this.list) => {
		this.listTemplate = template;
	};

	setList = (list: typeof this.list, save: boolean = true) => {
		this.list = { ...list } || {};
		this.userStore.updateAllData({ list: this.list });
		save && this.userStore.pushDataToSaving();
	};

	addItem = (payload: ExpenseItem, id: string = uniqid()) => {
		this.setList({ ...this.list, [id]: payload });
	};

	removeItem = (id: string) => {
		const newList = this.list;
		newList[id].deleted = true;
		newList[id].deletedAt = dayjs().valueOf();
		this.setList(newList);
		this.setLastDeletedItemIds([]);
	};

	restoreItem = (id: string) => {
		const newList = this.list;
		newList[id].deleted = false;
		delete newList[id].deletedAt;
		this.setList(newList);
	};

	deleteItem = (id: string) => {
		const newList = this.list;
		delete newList[id];
		this.setList(newList);
	};

	setLastDeletedItemIds = (ids: string[]) => {
		this.lastDeletedItemIds = ids;
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
