import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import firebaseApp from './firebase';
import { ExpenseItem, Status, category } from 'settings/interfaces';
import constants from 'settings/constants';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const saveData = async (
	user: any,
	data: {
		list: ExpenseItem[];
		categories: category[];
	},
	setStatus: (arg0: Status) => void,
	decreaseRecentChanges: (value: number) => void,
	initialRecentChanges: number
) => {
	data = {
		list: data.list.map((el) => JSON.parse(JSON.stringify(el))) || [],
		categories: data.categories.map((el) => JSON.parse(JSON.stringify(el))) || [
			constants.defaultCategory,
		],
	};
	setStatus('loading');
	if (user.uid) {
		try {
			const userDocRef = doc(usersCollection, user.uid);
			if (userDocRef) {
				await setDoc(userDocRef, data, { merge: true });
				setStatus('success');
			}
			decreaseRecentChanges(initialRecentChanges);
		} catch (error: any) {
			try {
				const userDocRef = doc(usersCollection, user.uid);
				if (userDocRef) {
					await setDoc(userDocRef, data);
					setStatus('success');
				}
				decreaseRecentChanges(initialRecentChanges);
			} catch (error: any) {
				setStatus('error');
				alert(`Saving error: ${error}`);
			}
		}
	}
};

export default saveData;
