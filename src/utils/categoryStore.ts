import { makeAutoObservable } from 'mobx';
import { category } from '../settings/interfaces';
import { userStore } from './userStore';
import { configure } from 'mobx';
import { uniqueId } from 'lodash';
import constants from 'settings/constants';

configure({
	enforceActions: 'never',
});

class CategoryStore {
	userStore;
	categories: { [key: string]: category } = {};

	setCategories = (
		categories: { [key: string]: category },
		save: boolean = true
	) => {
		this.categories = { ...categories } || { 0: constants.defaultCategory };
		console.log(JSON.parse(JSON.stringify(this.categories)));
		this.userStore.setAllData({ categories: this.categories }, save);
	};

	addCategory = (payload: category) => {
		this.setCategories({ ...this.categories, [uniqueId()]: payload });
	};

	removeCategory = (id: string) => {
		const newCategories = this.categories;
		delete newCategories[id];
		this.setCategories(newCategories);
	};

	replaceCategory = (id: string, payload: category) => {
		this.setCategories({ ...this.categories, [id]: payload });
	};

	constructor(userStore: any) {
		this.userStore = userStore;
		makeAutoObservable(this);
	}
}

export const categoryStore = new CategoryStore(userStore);
