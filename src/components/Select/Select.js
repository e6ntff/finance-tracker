import React from 'react'

import styles from './Select.module.scss'

const Select = (props) => {
  return (
    <div className={styles.label}>
      <select
        name="yearSelect"
        className={styles.select}
        onChange={props.handleYearChanging}
      >
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
      <span className={styles.text}>Filter by year</span>
    </div>
  )
}

export default Select
