import React from 'react'

import styles from './NoExpenses.module.css'

const NoExpenses = (props) => {
  const isVisible = props.visible ? 'block' : 'none'
  return (
    <h1 style={{ display: isVisible }} className={styles.text}>
      No expenses this year
    </h1>
  )
}

export default NoExpenses
