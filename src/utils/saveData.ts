import {
	getFirestore,
	collection,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { ExpenseItem, Status, category } from 'settings/interfaces';
import firebaseApp from './firebase';
import constants from 'settings/constants';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const saveData = async (
	user: any,
	setStatus: (arg0: Status) => void,
	decreaseRecentChanges: (value: number) => void,
	initialRecentChanges: number,
	key: 'list' | 'categories',
	data: { [key: string]: ExpenseItem } | { [key: string]: category }
) => {
	setStatus('loading');
	if (user.uid) {
		try {
			const userDocRef = doc(usersCollection, user.uid);
			if (userDocRef) {
				if (key === 'list') {
					await updateDoc(userDocRef, { list: data });
				} else if (key === 'categories') {
					await updateDoc(userDocRef, { categories: data });
				}
				setStatus('success');
			}
			decreaseRecentChanges(initialRecentChanges);
		} catch (error: any) {
			console.log(error);
			try {
				const userDocRef = doc(usersCollection, user.uid);
				if (userDocRef) {
					await setDoc(userDocRef, constants.defaultData);
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
