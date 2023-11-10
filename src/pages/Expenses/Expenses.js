import React from 'react'

import styles from './Expenses.module.scss'

import AddForm from '../../components/AddForm/AddForm'
import List from '../../components/List/List'

const Expenses = (props) => {
  return (
    <div className={styles.expenses}>
      <AddForm list={props.list} setList={props.setList} />
      <List
        list={props.list}
        setList={props.setList}
        filteredList={props.filteredList}
        setYear={props.setYear}
				handleYearChanging={props.handleYearChanging}
      />
    </div>
  )
}

export default Expenses
