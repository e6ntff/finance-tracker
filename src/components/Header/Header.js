import React from 'react'

import styles from './Header.module.scss'
import ThemeCheckbox from '../ThemeCheckbox/ThemeCheckbox'
import RefreshButton from '../RefreshButton/RefreshButton'

const Header = (props) => {
  return (
    <header className={styles.header}>
      <RefreshButton setList={props.setList} />
      <ThemeCheckbox />
    </header>
  )
}

export default Header
