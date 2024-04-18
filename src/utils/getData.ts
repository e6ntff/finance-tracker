import { ExpenseItem, Goal, Status, category } from 'settings/interfaces';
import { onValue, ref } from 'firebase/database';
import { database } from './firebase';

const getData = async (
	uid: string,
	setStatus: (arg0: Status) => void,
	setList: (list: { [key: string]: ExpenseItem }, save?: boolean) => void,
	setCategories: (
		categories: { [key: string]: category },
		save?: boolean
	) => void,
	setGoals: (goals: { [key: string]: Goal }, save: boolean) => void,
	setLoading: (value: boolean) => void
) => {
	setStatus({ status: 'loading' });
	try {
		onValue(ref(database, `data/${uid}`), (snapshot) => {
			const data = snapshot.val();
			setList(data?.list, false);
			setCategories(data?.categories, false);
			setGoals(data?.goals, false);
			setLoading(false);
		});
		setStatus({ status: 'success' });
	} catch (error: any) {
		setStatus({ status: 'error', text: error.message });
	}
};

export default getData;
