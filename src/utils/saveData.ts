import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import firebaseApp from './firebase';
import { ExpenseItem, category } from 'settings/interfaces';
import constants from 'settings/constants';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const saveData = async (
	user: any,
	data: {
		list: ExpenseItem[];
		categories: category[];
	}
) => {
	data = {
		list: data.list.map((el) => JSON.parse(JSON.stringify(el))) || [],
		categories: data.categories.map((el) => JSON.parse(JSON.stringify(el))) || [
			constants.defaultCategory,
		],
	};

	if (user.uid) {
		try {
			const userDocRef = doc(usersCollection, user.uid);
			if (userDocRef) {
				await setDoc(userDocRef, data, { merge: true });
			}
		} catch (error: any) {
			try {
				const userDocRef = doc(usersCollection, user.uid);
				if (userDocRef) {
					await setDoc(userDocRef, data);
				}
			} catch (erroe: any) {
				alert(`Saving error: ${error}`);
			}
		}
	}
};

export default saveData;
