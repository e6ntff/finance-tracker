import React from 'react'

import styles from './RefreshButton.module.scss'

import getList from '../../api/getList'

const RefreshButton = (props) => {
  const refresh = () => {
    getList().then((data) => props.setList(data))
  }

  return (
    <button className={styles.button} onClick={refresh}>
      ⟳
    </button>
  )
}

export default RefreshButton
