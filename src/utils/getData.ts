import { ExpenseItem, Status, category } from 'settings/interfaces';
import { onValue, ref } from 'firebase/database';
import { database } from './firebase';

const getData = async (
	uid: string,
	setStatus: (arg0: Status) => void,
	setList: (list: { [key: string]: ExpenseItem }, save?: boolean) => void,
	setCategories: (list: { [key: string]: category }, save?: boolean) => void,
	setLoading: (value: boolean) => void
) => {
	setStatus({ status: 'loading' });
	try {
		await onValue(ref(database, uid), (snapshot) => {
			const data = snapshot.val();
			setList(data?.list, false);
			setCategories(data?.categories, false);
			setLoading(false);
		});
		setStatus({ status: 'success' });
	} catch (error: any) {
		setStatus({ status: 'error', text: error.message });
	}
};

export default getData;
