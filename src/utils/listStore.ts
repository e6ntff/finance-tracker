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
	userList: typeof this.list = {};
	lastDeletedItemIds: string[] = [];
	listTemplate: typeof this.list = {};
	list: { [key: string]: ExpenseItem } = {};

	setList = (list: typeof this.list) => {
		this.list = list;
	};

	setListTemplate = (template: typeof this.list) => {
		this.listTemplate = template;
	};

	setUserList = (list: typeof this.list, save: boolean = true) => {
		this.userList = { ...list } || {};
		this.userStore.updateAllData({ list: this.userList });
		save && this.userStore.pushDataToSaving();
	};

	addItem = (payload: ExpenseItem, id: string = uniqid()) => {
		this.setUserList({ ...this.userList, [id]: payload });
	};

	removeItem = (id: string) => {
		const newList = this.userList;
		newList[id].deleted = true;
		newList[id].deletedAt = dayjs().valueOf();
		this.setUserList(newList);
		this.setLastDeletedItemIds([]);
	};

	restoreItem = (id: string) => {
		const newList = this.userList;
		newList[id].deleted = false;
		delete newList[id].deletedAt;
		this.setUserList(newList);
	};

	deleteItem = (id: string) => {
		const newList = this.userList;
		delete newList[id];
		this.setUserList(newList);
	};

	setLastDeletedItemIds = (ids: string[]) => {
		this.lastDeletedItemIds = ids;
	};

	replaceItem = (id: string, payload: ExpenseItem) => {
		this.setUserList({ ...this.userList, [id]: payload });
	};

	clearListFromCategory = (id: string) => {
		const newList = this.userList;
		for (const key in newList) {
			if (newList[key].categoryId === id) {
				newList[key].categoryId = '0';
			}
		}
		this.setUserList(newList);
	};

	constructor(store: typeof userStore) {
		this.userStore = store;
		makeAutoObservable(this);
	}
}

export const listStore = new ListStore(userStore);
