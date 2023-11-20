import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCNwPsJOCr59O12opgmV0mX_B486kpBH5A',
  authDomain: 'expense-manager-8dd03.firebaseapp.com',
  databaseURL:
    'https://expense-manager-8dd03-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'expense-manager-8dd03',
  storageBucket: 'expense-manager-8dd03.appspot.com',
  messagingSenderId: '459452052309',
  appId: '1:459452052309:web:b87729a7ce601db8c875dc',
  measurementId: 'G-WXKQJKWKY2',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp