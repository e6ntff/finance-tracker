import { makeAutoObservable } from 'mobx';
import { category } from '../settings/interfaces';
import { userStore } from './userStore';
import { configure } from 'mobx';
import constants from 'settings/constants';
import uniqid from 'uniqid';

configure({
	enforceActions: 'never',
});

class CategoryStore {
	userStore;
	categories: { [key: string]: category } = {};
	lastDeletedCategoryId: string = '';

	setCategories = (
		categories: { [key: string]: category },
		save: boolean = true
	) => {
		this.categories = { ...categories } || { '0': constants.defaultCategory };
		this.userStore.updateAllData({ categories: this.categories });
		save && this.userStore.pushDataToSaving();
	};

	addCategory = (payload: category, id: string = uniqid()) => {
		this.setCategories({ ...this.categories, [id]: payload });
	};

	removeCategory = (id: string) => {
		const newCategories = this.categories;
		delete newCategories[id];
		this.setCategories(newCategories);
		this.setLastDeletedCategoryId('');
	};

	setLastDeletedCategoryId = (id: string) => {
		this.lastDeletedCategoryId = id;
	};

	replaceCategory = (id: string, payload: category) => {
		this.setCategories({ ...this.categories, [id]: payload });
	};

	constructor(store: typeof userStore) {
		this.userStore = store;
		makeAutoObservable(this);
	}
}

export const categoryStore = new CategoryStore(userStore);
