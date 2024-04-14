import { AllData, Status } from 'settings/interfaces';
import constants from 'settings/constants';
import { ref, set } from 'firebase/database';
import { database } from './firebase';

const saveData = async (
	uid: string,
	setStatus: (arg0: Status) => void,
	setIsDataChanged: (arg0: boolean) => void,
	data: AllData
) => {
	setStatus({ status: 'loading' });
	const errorId = setTimeout(() => {
		setStatus({ status: 'error', text: 'Error saving data' });
	}, constants.errorDelay);
	if (uid) {
		try {
			await set(ref(database, `data/${uid}`), JSON.parse(JSON.stringify(data)));
			clearTimeout(errorId);
			setStatus({ status: 'success' });
			setIsDataChanged(false);
		} catch (error: any) {
			setStatus({ status: 'error', text: error });
		}
	}
};

export default saveData;
