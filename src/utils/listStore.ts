import constants from '../settings/constants';
import { ExpenseItem, category } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
class ListStore {
	list: ExpenseItem[] = [];
	loading: boolean = true;

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setList = (list: ExpenseItem[]) => {
		this.list = list;
	};

	addItem = (item: ExpenseItem) => {
		this.list = [item, ...this.list];
	};

	removeItem = (itemToRemove: ExpenseItem) => {
		this.list = this.list.filter(
			(item: ExpenseItem) => itemToRemove.id !== item.id
		);
	};

	replaceItem = (itemToReplace: ExpenseItem) => {
		this.list = this.list.map((item: ExpenseItem) =>
			item.id === itemToReplace.id ? itemToReplace : item
		);
	};

	clearListFromCategory = (category: category) => {
		this.list = this.list.map((item: ExpenseItem) =>
			item.category.id === category.id
				? {
						...item,
						category: constants.defaultCategory,
				  }
				: item
		);
	};

	refreshItemByCategory = (category: category) => {
		this.list = this.list.map((item: ExpenseItem) =>
			item.category.id === category.id ? { ...item, category: category } : item
		);
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export const listStore = new ListStore();
