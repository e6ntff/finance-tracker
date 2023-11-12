import React, { useContext } from 'react'
import { LanguageContext } from '../LanguageContext/LanguageContext'

import styles from './Select.module.scss'

const Select = (props) => {
  const { language, languages } = useContext(LanguageContext)

  return (
    <label className={styles.label}>
      <select
        value={props.year}
        name="yearSelect"
        className={styles.select}
        onChange={props.handleYearChanging}
      >
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
      <span className={styles.text}>{languages.filterByYear[language]}</span>
    </label>
  )
}

export default Select
