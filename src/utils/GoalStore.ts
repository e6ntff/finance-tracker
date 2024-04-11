import { makeAutoObservable } from 'mobx';
import { userStore } from './userStore';
import uniqid from 'uniqid';
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
		this.userStore.updateAllData({ goals: this.userGoals });
		save && this.userStore.pushDataToSaving();
	};

	addGoal = (payload: Goal, id: string = uniqid()) => {
		this.setUserGoals({ ...this.userGoals, [id]: payload });
	};

	removeGoal = (id: string) => {
		const newGoals = this.userGoals;
		delete newGoals[id];
		this.setUserGoals(newGoals);
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
