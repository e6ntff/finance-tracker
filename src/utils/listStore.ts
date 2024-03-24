import { ExpenseItem } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
import { userStore } from './userStore';
import { configure } from 'mobx';

configure({
	enforceActions: 'never',
});

class ListStore {
	userStore;
	list: { [key: string]: ExpenseItem } = {};

	setList = (list: { [key: string]: ExpenseItem }, save: boolean = true) => {
		this.list = list || {};
		this.userStore.setAllData({ list: this.list }, save);
	};

	addItem = (payload: ExpenseItem) => {
		const newList = this.list;
		newList[Math.random()] = payload;
		this.setList(newList);
	};

	removeItem = (id: string) => {
		const newList = this.list;
		delete newList[id];
		this.setList(newList);
	};

	replaceItem = (id: string, payload: ExpenseItem) => {
		const newList = this.list;
		newList[id] = payload;
		this.setList(newList);
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
