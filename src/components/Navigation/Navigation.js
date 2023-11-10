import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import styles from './Navigation.module.scss'

import paths from '../../settings/paths'

const Navigation = () => {
  const location = useLocation()

  const isActivePath = (path) => path === location.pathname

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to={paths.home}
            className={isActivePath(paths.home) ? styles.active : ''}
          >
            <button className={styles.button}>Home</button>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to={paths.dashboard}
            className={isActivePath(paths.dashboard) ? styles.active : ''}
          >
            <button className={styles.button}>Dashboard</button>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to={paths.expenses}
            className={isActivePath(paths.expenses) ? styles.active : ''}
          >
            <button className={styles.button}>Expenses</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
