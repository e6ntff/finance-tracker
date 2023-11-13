import React from 'react';

import styles from './Header.module.scss';
import ThemeCheckbox from '../ThemeCheckbox/ThemeCheckbox';
import RefreshButton from '../RefreshButton/RefreshButton';
import Navigation from '../Navigation/Navigation';
import Links from '../Links/Links';

const Header: React.FC<any> = (props) => {
  return (
    <header className={styles.header}>
      <Navigation />
      <div className={styles.other}>
        <RefreshButton setList={props.setList} />
        <ThemeCheckbox />
        <Links />
      </div>
    </header>
  );
};

export default Header;
