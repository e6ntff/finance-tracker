import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import firebaseApp from './firebase';
import { ExpenseItem, category } from 'settings/interfaces';
import constants from 'settings/constants';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const pushDataToServer = async (uid: string, data: any) => {
	const userDocRef = doc(usersCollection, uid);
	if (userDocRef) {
		await setDoc(userDocRef, data);
	}
};

const saveData = (
	user: any,
	data: {
		list: ExpenseItem[];
		categories: category[];
	}
) => {
	try {
		if (Object.keys(user).length) {
			pushDataToServer(user.uid, {
				list: data.list.map((el) => JSON.parse(JSON.stringify(el))) || [],
				categories: data.categories.map((el) =>
					JSON.parse(JSON.stringify(el))
				) || [constants.defaultCategory],
			});
		}
	} catch (error: any) {
		alert(`Saving error: ${error}`);
	}
};

export default saveData;
