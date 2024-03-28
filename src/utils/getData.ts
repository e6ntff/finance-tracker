import constants from '../settings/constants';
import firebaseApp from './firebase';

import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

const getData = async (user: any) => {
	const uid = user.uid;
	const usersCollection = collection(firestore, 'users');
	if (uid) {
		const userDocRef = doc(usersCollection, uid);

		try {
			const userDocSnapshot = await getDoc(userDocRef);
			if (userDocSnapshot.exists()) {
				return userDocSnapshot.data();
			} else {
				return {
					list: [],
					categories: [constants.defaultCategory],
				};
			}
		} catch (error: any) {
			alert(`Error getting data: ${error.message}`);
			return {
				list: [],
				categories: [constants.defaultCategory],
			};
		}
	}
};

export default getData;
