import { makeAutoObservable } from 'mobx';
import { category } from '../settings/interfaces';
import { userStore } from './userStore';
import { configure } from 'mobx';
import constants from 'settings/constants';
import uniqid from 'uniqid';
import dayjs from 'dayjs';

configure({
	enforceActions: 'never',
});

class CategoryStore {
	userStore;
	userCategories: { [key: string]: category } = {};
	lastDeletedCategoryIds: string[] = [];
	categoriesTemplate: typeof this.userCategories = {};

	setCategoriesTemplate = (template: typeof this.userCategories) => {
		this.categoriesTemplate = template;
	};

	setCategories = (
		categories: { [key: string]: category },
		save: boolean = true
	) => {
		this.userCategories = { ...categories } || { '0': constants.defaultCategory };
		this.userStore.updateAllData({ categories: this.userCategories });
		save && this.userStore.pushDataToSaving();
	};

	addCategory = (payload: category, id: string = uniqid()) => {
		this.setCategories({ ...this.userCategories, [id]: payload });
	};

	removeCategory = (id: string) => {
		const newCategories = this.userCategories;
		newCategories[id].deleted = true;
		newCategories[id].deletedAt = dayjs().valueOf();
		this.setCategories(newCategories);
		this.setLastDeletedCategoryIds([]);
	};

	restoreCategory = (id: string) => {
		const newCategories = this.userCategories;
		newCategories[id].deleted = false;
		delete newCategories[id].deletedAt;
		this.setCategories(newCategories);
	};

	deleteCategory = (id: string) => {
		const newCategories = this.userCategories;
		delete newCategories[id];
		this.setCategories(newCategories);
	};

	setLastDeletedCategoryIds = (ids: string[]) => {
		this.lastDeletedCategoryIds = ids;
	};

	replaceCategory = (id: string, payload: category) => {
		this.setCategories({ ...this.userCategories, [id]: payload });
	};

	constructor(store: typeof userStore) {
		this.userStore = store;
		makeAutoObservable(this);
	}
}

export const categoryStore = new CategoryStore(userStore);
