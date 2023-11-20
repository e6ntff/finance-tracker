import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../utils/firebase';

import styles from './Login.module.scss';

const auth = getAuth(firebaseApp);

const Login: React.FC = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: any) => {
		event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      console.log('success');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form action="" className={styles.form} onSubmit={handleFormSubmit}>
      <label htmlFor="email" className={styles.label}>
        E-mail
        <input
          type="text"
          name="email"
          className={styles.input}
          value={user.email}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="password" className={styles.label}>
        Password
        <input
          type="password"
          name="password"
          className={styles.input}
          value={user.password}
          onChange={handleFormChange}
        />
      </label>
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default Login;
