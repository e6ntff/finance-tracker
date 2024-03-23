import { makeAutoObservable } from 'mobx';
import { category } from '../settings/interfaces';
import constants from '../settings/constants';
import { userStore } from './userStore';
import { configure } from 'mobx';

configure({
	enforceActions: 'never',
});

class CategoryStore {
	userStore;
	categories: category[] = [constants.defaultCategory];
	loading: boolean = true;

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setCategories = (categories: category[], save: boolean = true) => {
		this.categories = categories || [constants.defaultCategory];
		this.userStore.setAllData({ categories: this.categories }, save);
	};

	addCategory = (category: category) => {
		this.setCategories([category, ...this.categories]);
	};

	removeCategory = (categoryToDelete: category) => {
		this.setCategories(
			this.categories.filter(
				(category: category) => category.id !== categoryToDelete.id
			)
		);
	};

	replaceCategory = (category: category) => {
		this.setCategories(
			this.categories.map((cat: category) =>
				cat.id === category.id ? category : cat
			)
		);
	};

	getCategoryById = (id: number) =>
		this.categories.find((item: category) => item.id === id) ||
		constants.defaultCategory;

	constructor(userStore: any) {
		this.userStore = userStore;
		makeAutoObservable(this);
	}
}

export const categoryStore = new CategoryStore(userStore);
