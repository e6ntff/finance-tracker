import React from 'react'

import styles from './Dashboard.module.scss'

import Diagram from '../../components/Diagram/Diagram'
import Select from '../../components/Select/Select'

const Dashboard = (props) => {
  return (
    <div className={styles.dashboard}>
      <Select
        handleYearChanging={props.handleYearChanging}
        setList={props.setList}
      />
      <Diagram filteredList={props.filteredList} />
    </div>
  )
}

export default Dashboard
