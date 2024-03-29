import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { AllData, Status } from 'settings/interfaces';
import firebaseApp from './firebase';
import constants from 'settings/constants';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const saveData = async (
	user: any,
	setStatus: (arg0: Status) => void,
	setIsDataChanged: (arg0: boolean) => void,
	data: AllData
) => {
	setStatus({ status: 'loading' });
	const errorId = setTimeout(() => {
		setStatus({ status: 'error', text: 'Error saving data' });
	}, constants.errorDelay);
	if (user.uid) {
		const userDocRef = doc(usersCollection, user.uid);
		if (userDocRef) {
			try {
				await setDoc(userDocRef, { ...data });
				clearTimeout(errorId);
				setStatus({ status: 'success' });
				setIsDataChanged(false);
			} catch (error: any) {
				setStatus({ status: 'error', text: error });
			}
		}
	}
};

export default saveData;
