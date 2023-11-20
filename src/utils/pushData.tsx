import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';

import firebaseApp from './firebase';

const firestore = getFirestore(firebaseApp);
const usersCollection = collection(firestore, 'users');

const pushDataToServer = async (uid: string, data: any) => {
  const userDocRef = doc(usersCollection, uid);
  await setDoc(userDocRef, data);
};

export default pushDataToServer;
