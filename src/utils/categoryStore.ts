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
	lastDeletedCategory: { id: string; category: category } = {
		id: '',
		category: constants.defaultCategory,
	};

	setCategories = (
		categories: { [key: string]: category },
		save: boolean = true
	) => {
		this.categories = { ...categories } || { '0': constants.defaultCategory };
		save && this.userStore.pushDataToSaving({ categories: this.categories });
	};

	addCategory = (payload: category, id: string = uniqid()) => {
		this.setCategories({ ...this.categories, [id]: payload });
	};

	removeCategory = (id: string) => {
		const newCategories = this.categories;
		this.lastDeletedCategory = { id: id, category: { ...newCategories[id] } };
		delete newCategories[id];
		this.setCategories(newCategories);
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
