import React from 'react'

import styles from './Dashboard.module.scss'

import Diagram from '../../components/Diagram/Diagram'
import Select from '../../components/Select/Select'
import NoExpenses from '../../components/NoExpenses/NoExpenses'

const Dashboard: React.FC<any> = (props) => {
  return (
    <div className={styles.dashboard}>
      <Select
        year={props.year}
        handleYearChanging={props.handleYearChanging}
        setList={props.setList}
      />
      {props.filteredList.length ? (
        <Diagram filteredList={props.filteredList} />
      ) : (
        <NoExpenses />
      )}
    </div>
  )
}

export default Dashboard
