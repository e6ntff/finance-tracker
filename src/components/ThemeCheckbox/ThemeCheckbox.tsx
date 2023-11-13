import React, { useEffect, useState } from 'react'

import styles from './ThemeCheckbox.module.scss'
import setTheme from '../../utils/themes'

const ThemeCheckbox: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('theme', 'light')
  }, [])

  const [checked, setChecked] = useState<boolean>(
    localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    setTheme(checked)
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }, [checked])

  return (
    <>
      <label className={styles.label}>
        <input
          type="checkbox"
          name="checkbox"
          className={styles.hidden}
          id="theme-checkbox"
          checked={checked}
          onChange={() => setChecked((prevChecked) => !prevChecked)}
        />
        <span className={styles.pseudo}></span>
      </label>
    </>
  )
}

export default ThemeCheckbox
