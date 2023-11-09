import React, { useState } from 'react'

import styles from './ThemeCheckbox.module.scss'
import setTheme from '../../utils/themes'

const ThemeCheckbox = () => {
  const [checked, setChecked] = useState(false)

  setTheme(checked)

  return (
    <>
      <label className={styles.label}>
        _____
        <input
          type="checkbox"
          name="checkbox"
          className={styles.hidden}
          id="theme-checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span className={styles.pseudo}></span>
      </label>
    </>
  )
}

export default ThemeCheckbox
