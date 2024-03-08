import { makeAutoObservable } from 'mobx';
import { category } from '../settings/interfaces';
import constants from '../settings/constants';

class CategoryStore {
	categories: category[] = [constants.defaultCategory];

	setCategories = (categories: category[]) => {
		this.categories = categories;
	};

	addCategory = (category: category) => {
		this.categories = [...this.categories, category];
	};

	removeCategory = (categoryToDelete: category) => {
		this.categories = this.categories.filter(
			(category: category) => category.id !== categoryToDelete.id
		);
	};

	replaceCategory = (category: category) => {
		this.categories = this.categories.map((cat: category) =>
			cat.id === category.id ? category : cat
		);
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export const categoryStore = new CategoryStore();
