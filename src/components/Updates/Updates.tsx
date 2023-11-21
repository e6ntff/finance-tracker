import React, { useContext, useState } from 'react';

import styles from './Updates.module.scss';
import { LanguageContext } from '../LanguageContext/LanguageContext';

const Updates: React.FC = () => {
  const { language, languages } = useContext(LanguageContext);

  const [opened, setOpened] = useState<boolean>(false);

  const handleClick = () => {
    setOpened((prevOpened) => !prevOpened);
  };

  return (
    <div className={styles.updates}>
      <button
        className={`${styles.button} ${opened ? styles.active : ''}`}
        onClick={handleClick}
      >
        Updates
      </button>
      <ul className={`${styles.list} ${opened ? styles.opened : ''}`}>
        {languages.updates.map((update: any, index: number) => (
          <li key={index} className={styles.item}>
            <p>{update.text[language]}</p>
            <p>{update.date[language]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Updates;
