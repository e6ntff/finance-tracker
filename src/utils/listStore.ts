import constants from '../settings/constants';
import { ExpenseItem } from '../settings/interfaces';
import { makeAutoObservable } from 'mobx';
import { categoryStore } from './categoryStore';

class ListStore {
	categoryStore;
	list: ExpenseItem[] = [];
	loading: boolean = true;

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setList = (list: ExpenseItem[]) => {
		this.list = list || [];
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

	constructor(categoryStore: any) {
		this.categoryStore = categoryStore;
		makeAutoObservable(this);
	}
}

export const listStore = new ListStore(categoryStore);

// reaction
