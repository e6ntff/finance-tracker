import React from 'react';

import styles from './Header.module.scss';
import ThemeCheckbox from '../ThemeCheckbox/ThemeCheckbox';
import Navigation from '../Navigation/Navigation';
import Links from '../Links/Links';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Navigation />
      <div className={styles.other}>
        <ThemeCheckbox />
        <Links />
      </div>
    </header>
  );
};

export default Header;
