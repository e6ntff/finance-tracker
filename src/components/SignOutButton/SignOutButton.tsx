import React, { useContext } from 'react';

import styles from './SignOutButton.module.scss';

import firebaseApp from '../../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { LanguageContext } from '../LanguageContext/LanguageContext';

const SignOutButton: React.FC = () => {
  const { language, languages } = useContext(LanguageContext);

  const auth = getAuth(firebaseApp);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <button className={styles.button} onClick={logOut}>
      {languages.signOut[language]}
    </button>
  );
};

export default SignOutButton;
