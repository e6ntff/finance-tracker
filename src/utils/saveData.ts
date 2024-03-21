import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
import firebaseApp from './firebase';
import { ExpenseItem, category } from 'settings/interfaces';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const saveData = async (
	user: any,
	data: {
		list?: ExpenseItem[];
		categories?: category[];
	}
) => {
	try {
		if (user.uid) {
			const userDocRef = doc(usersCollection, user.uid);
			if (userDocRef) {
				await updateDoc(userDocRef, data);
			}
		}
	} catch (error: any) {
		alert(`Saving error: ${error}`);
	}
};

export default saveData;
