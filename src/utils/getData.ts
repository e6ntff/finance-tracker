import { Status } from 'settings/interfaces';
import constants from '../settings/constants';
import firebaseApp from './firebase';

import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

const getData = async (user: any, setStatus: (arg0: Status) => void) => {
	const uid = user.uid;
	const usersCollection = collection(firestore, 'users');
	if (uid) {
		setStatus({ status: 'loading' });
		const userDocRef = doc(usersCollection, uid);
		try {
			const userDocSnapshot = await getDoc(userDocRef);
			if (userDocSnapshot.exists()) {
				setStatus({ status: 'success' });
				return userDocSnapshot.data();
			} else {
				setStatus({ status: 'success' });
				return constants.defaultData;
			}
		} catch (error: any) {
			setStatus({ status: 'error', text: error.message });
			return constants.defaultData;
		}
	}
};

export default getData;
