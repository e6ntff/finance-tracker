import { makeAutoObservable } from 'mobx';
import { category } from '../settings/interfaces';
import constants from '../settings/constants';

class CategoryStore {
	categories: category[] = [constants.defaultCategory];
	loading: boolean = true;

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setCategories = (categories: category[]) => {
		this.categories = categories || [constants.defaultCategory];
	};

	addCategory = (category: category) => {
		this.setCategories([...this.categories, category]);
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

	constructor() {
		makeAutoObservable(this);
	}
}

export const categoryStore = new CategoryStore();
