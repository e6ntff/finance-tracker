import React from 'react';

import styles from './Preloader.module.scss'

const Preloader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Preloader;
