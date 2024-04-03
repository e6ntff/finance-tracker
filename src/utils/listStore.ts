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
	userList: { [key: string]: ExpenseItem } = {};
	lastDeletedItemIds: string[] = [];
	listTemplate: typeof this.userList = {};

	setListTemplate = (template: typeof this.userList) => {
		this.listTemplate = template;
	};

	setList = (list: typeof this.userList, save: boolean = true) => {
		this.userList = { ...list } || {};
		this.userStore.updateAllData({ list: this.userList });
		save && this.userStore.pushDataToSaving();
	};

	addItem = (payload: ExpenseItem, id: string = uniqid()) => {
		this.setList({ ...this.userList, [id]: payload });
	};

	removeItem = (id: string) => {
		const newList = this.userList;
		newList[id].deleted = true;
		newList[id].deletedAt = dayjs().valueOf();
		this.setList(newList);
		this.setLastDeletedItemIds([]);
	};

	restoreItem = (id: string) => {
		const newList = this.userList;
		newList[id].deleted = false;
		delete newList[id].deletedAt;
		this.setList(newList);
	};

	deleteItem = (id: string) => {
		const newList = this.userList;
		delete newList[id];
		this.setList(newList);
	};

	setLastDeletedItemIds = (ids: string[]) => {
		this.lastDeletedItemIds = ids;
	};

	replaceItem = (id: string, payload: ExpenseItem) => {
		this.setList({ ...this.userList, [id]: payload });
	};

	clearListFromCategory = (id: string) => {
		const newList = this.userList;
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
