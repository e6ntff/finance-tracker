import { ExpenseItem, Goal, Status, category } from 'settings/interfaces';
import { onValue, ref } from 'firebase/database';
import { database } from './firebase';

const getData: (
	uid: string,
	setList: (list: { [key: string]: ExpenseItem }, save?: boolean) => void,
	setCategories: (
		categories: { [key: string]: category },
		save?: boolean
	) => void,
	setGoals: (goals: { [key: string]: Goal }, save: boolean) => void
) => Promise<void> = async (
	uid: string,
	setList: (list: { [key: string]: ExpenseItem }, save?: boolean) => void,
	setCategories: (
		categories: { [key: string]: category },
		save?: boolean
	) => void,
	setGoals: (goals: { [key: string]: Goal }, save: boolean) => void
) =>
	new Promise((res, rej) => {
		try {
			onValue(ref(database, `data/${uid}`), (snapshot) => {
				const data = snapshot.val();
				setList(data?.list, false);
				setCategories(data?.categories, false);
				setGoals(data?.goals, false);
				res();
			});
		} catch (error: any) {
			rej(error);
		}
	});

export default getData;
