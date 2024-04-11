import { makeAutoObservable } from 'mobx';
import { userStore } from './userStore';
import uniqid from 'uniqid';
import dayjs from 'dayjs';
import { Goal } from 'settings/interfaces';

class GoalStore {
	userStore;
	userGoals: typeof this.goals = {};
	lastDeletedGoalIds: string[] = [];
	goalsTemplate: typeof this.goals = {};
	goals: { [key: string]: Goal } = {};

	setGoals = (goals: typeof this.goals) => {
		this.goals = goals;
	};

	setGoalsTemplate = (template: typeof this.goals) => {
		this.goalsTemplate = template;
	};

	setUserGoals = (goals: typeof this.goals, save: boolean = true) => {
		this.userGoals = { ...goals } || {};
		this.userStore.updateAllData({ list: this.userGoals });
		save && this.userStore.pushDataToSaving();
	};

	addGoal = (payload: Goal, id: string = uniqid()) => {
		this.setUserGoals({ ...this.userGoals, [id]: payload });
	};

	removeGoal = (id: string) => {
		const newList = this.userGoals;
		newList[id].deleted = true;
		newList[id].deletedAt = dayjs().valueOf();
		this.setUserGoals(newList);
		this.setLastDeletedGoalIds([]);
	};

	restoreGoal = (id: string) => {
		const newList = this.userGoals;
		newList[id].deleted = false;
		delete newList[id].deletedAt;
		this.setUserGoals(newList);
	};

	deleteGoal = (id: string) => {
		const newList = this.userGoals;
		delete newList[id];
		this.setUserGoals(newList);
	};

	setLastDeletedGoalIds = (ids: string[]) => {
		this.lastDeletedGoalIds = ids;
	};

	replaceGoal = (id: string, payload: Goal) => {
		this.setUserGoals({ ...this.userGoals, [id]: payload });
	};

	constructor(UserStore: typeof userStore) {
		this.userStore = UserStore;
		makeAutoObservable(this);
	}
}

const goalStore = new GoalStore(userStore);

export default goalStore;
