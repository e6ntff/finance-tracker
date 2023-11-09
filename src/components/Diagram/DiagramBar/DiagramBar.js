import React from 'react'

import styles from './DiagramBar.module.css'

const DiagramBar = (props) => {
  const value = (props.value / props.maxValue) * 100 + '%'

  return (
    <li className={styles.bar}>
      <div className={styles.column} style={{ '--value': value }}></div>
      <span className={styles.month}>{props.month}</span>
    </li>
  )
}

export default DiagramBar
