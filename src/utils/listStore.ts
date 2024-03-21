import constants from '../settings/constants';
import { ExpenseItem, category } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
import saveData from './saveData';
import { userStore } from './userStore';
class ListStore {
	userStore;
	list: ExpenseItem[] = [];
	loading: boolean = true;

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setList = (list: ExpenseItem[]) => {
		this.list = list;
		saveData(this.userStore, { list: list });
	};

	addItem = (item: ExpenseItem) => {
		this.setList([{ ...item, id: Math.random() }, ...this.list]);
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

	clearListFromCategory = (category: category) => {
		this.setList(
			this.list.map((item: ExpenseItem) =>
				item.category.id === category.id
					? {
							...item,
							category: constants.defaultCategory,
					  }
					: item
			)
		);
	};

	refreshItemByCategory = (category: category) => {
		this.setList(
			this.list.map((item: ExpenseItem) =>
				item.category.id === category.id
					? { ...item, category: category }
					: item
			)
		);
	};

	constructor(userStore: any) {
		this.userStore = userStore;
		makeAutoObservable(this);
	}
}

export const listStore = new ListStore(userStore);
