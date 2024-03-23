import constants from '../settings/constants';
import { ExpenseItem } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
import { categoryStore } from './categoryStore';
import { userStore } from './userStore';

class ListStore {
	userStore;
	categoryStore;
	list: ExpenseItem[] = [];
	loading: boolean = true;

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setList = (list: ExpenseItem[], save: boolean = true) => {
		this.list = list || [];
		this.userStore.setAllData({ list: this.list }, save);
	};

	addItem = (item: ExpenseItem) => {
		this.setList([item, ...this.list]);
	};

	removeItem = (itemToRemove: ExpenseItem) => {
		this.setList(
			this.list.filter((item: ExpenseItem) => itemToRemove.id !== item.id)
		);
	};

	replaceItem = (itemToReplace: ExpenseItem) => {
		this.setList(
			(this.list = this.list.map((item: ExpenseItem) =>
				item.id === itemToReplace.id ? itemToReplace : item
			))
		);
	};

	clearListFromCategory = (categoryId: number) => {
		this.setList(
			this.list.map((item: ExpenseItem) =>
				item.categoryId === categoryId
					? {
							...item,
							categoryId: constants.defaultCategory.id,
					  }
					: item
			)
		);
	};

	constructor(userStore: any, categoryStore: any) {
		this.userStore = userStore;
		this.categoryStore = categoryStore;
		makeAutoObservable(this);
	}
}

export const listStore = new ListStore(userStore, categoryStore);

// reaction
