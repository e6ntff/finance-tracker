import React, { useContext } from 'react';
import { LanguageContext } from '../../components/LanguageContext/LanguageContext';

import styles from './About.module.scss';

const About: React.FC = () => {
  const { language, languages } = useContext(LanguageContext);

  return (
    <div className="app">
      <div className={styles.about}>
        <p className={styles.text}>{languages.aboutText.part1[language]}</p>
        <p className={styles.text}>{languages.aboutText.part2[language]}</p>
        <p className={styles.text}>{languages.aboutText.part3[language]}</p>
        <ul className={styles.list}>
          <li className={styles.text}>{languages.aboutText.part4[1][language]}</li>
          <li className={styles.text}>{languages.aboutText.part4[2][language]}</li>
          <li className={styles.text}>{languages.aboutText.part4[3][language]}</li>
          <li className={styles.text}>{languages.aboutText.part4[4][language]}</li>
        </ul>
        <p className={styles.text}>{languages.aboutText.part5[language]}</p>
      </div>
    </div>
  );
};

export default About;
