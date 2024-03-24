import {
	getFirestore,
	collection,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { AllData, Status } from 'settings/interfaces';
import firebaseApp from './firebase';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const saveData = async (
	user: any,
	data: { list?: {}; categories?: {} },
	setStatus: (arg0: Status) => void,
	decreaseRecentChanges: (value: number) => void,
	initialRecentChanges: number
) => {
	data = JSON.parse(JSON.stringify(data));
	setStatus('loading');
	if (user.uid) {
		try {
			const userDocRef = doc(usersCollection, user.uid);
			if (userDocRef) {
				await updateDoc(userDocRef, data);
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
