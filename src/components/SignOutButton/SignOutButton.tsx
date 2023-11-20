import React, { useContext } from 'react';

import styles from './SignOutButton.module.scss';

import firebaseApp from '../../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { LanguageContext } from '../LanguageContext/LanguageContext';
import { useDispatch } from 'react-redux';
import { setCategories, setList, setUser } from '../../utils/store';
import constants from '../../settings/constants';

const SignOutButton: React.FC = () => {
  const { language, languages } = useContext(LanguageContext);

  const auth = getAuth(firebaseApp);

  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setUser({ user: {} }));
      dispatch(setList({ list: [] }));
      dispatch(setCategories({ categories: [constants.defaultCategory] }));
    }
  };

  return (
    <button className={styles.button} onClick={logOut}>
      {languages.signOut[language]}
    </button>
  );
};

export default SignOutButton;
