import React, { useEffect, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './PageNotFound.module.scss';
import paths from '../../settings/paths';
import { LanguageContext } from '../LanguageContext/LanguageContext';

const PageNotFound: React.FC = () => {
  const [time, setTime] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const timeId = setInterval(() => {
      if (time === 0) {
        navigate(paths.home);
      }
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, [navigate, time]);

  const { language, languages } = useContext(LanguageContext);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <span className={styles.redirect}>
        {languages.notFound[language](time)}
      </span>
    </div>
  );
};

export default PageNotFound;
