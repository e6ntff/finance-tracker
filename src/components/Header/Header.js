import React from 'react'

import styles from './Header.module.scss'
import ThemeCheckbox from '../ThemeCheckbox/ThemeCheckbox'
import RefreshButton from '../RefreshButton/RefreshButton'
import Navigation from '../Navigation/Navigation'

const Header = (props) => {
  return (
    <header className={styles.header}>
      <Navigation />
      <div className={styles.other}>
        <RefreshButton setList={props.setList} />
        <ThemeCheckbox />
      </div>
    </header>
  )
}

export default Header
