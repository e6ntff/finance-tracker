import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../utils/firebase';

import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../components/LanguageContext/LanguageContext';
import paths from '../../settings/paths';

const auth = getAuth(firebaseApp);

const Register: React.FC = () => {
  const navigate = useNavigate();

  const { language, languages } = useContext(LanguageContext);

  const [valid, setValid] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState({
    email: '',
    password: '',
    passwordAgain: '',
  });

  const handleFormChange = (event: any) => {
    setValid(true);
    const { name, value } = event.target;

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    if (currentUser.password === currentUser.passwordAgain) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          currentUser.email,
          currentUser.password
        );
        navigate('/');
      } catch (error: any) {
        setValid(false);
        alert(`Error in signing in: ${error.message}`);
      }
    }
  };

  return (
    <div className="form">
      <form action="" className={styles.form} onSubmit={handleFormSubmit}>
        {!valid && (
          <p className={styles.invalid}>{languages.invalidLogin[language]}</p>
        )}
        <label htmlFor="email" className={styles.label}>
          {languages.email[language]}
          <input
            pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
            type="text"
            name="email"
            className={styles.input}
            value={currentUser.email}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          {languages.password[language]}
          <input
            type="password"
            name="password"
            minLength={6}
            maxLength={16}
            className={styles.input}
            value={currentUser.password}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="password-repeat" className={styles.label}>
          {languages.repeatPassword[language]}
          <input
            type="password"
            name="passwordAgain"
            minLength={6}
            maxLength={16}
            className={styles.input}
            value={currentUser.passwordAgain}
            onChange={handleFormChange}
          />
        </label>
        {currentUser.password !== currentUser.passwordAgain && (
          <p className={styles.invalid}>{languages.passMatch[language]}</p>
        )}
        <button type="submit" className={styles.button}>
          {languages.signIn[language]}
        </button>
        <button
          className={styles.link}
          onClick={() => {
            navigate(paths.login);
          }}
        >
          {languages.already[language]}
        </button>
      </form>
    </div>
  );
};

export default Register;
