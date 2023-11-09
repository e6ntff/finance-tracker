import React from 'react'
import ListItem from '../ListItem/ListItem'
import styles from './List.module.scss'

import Select from '../Select/Select'
import NoExpenses from '../NoExpenses/NoExpenses'

const List = (props) => {
  const handleYearChanging = (event) => {
    props.setYear(Number(event.target.value))
  }

  return (
    <>
      <Select handleYearChanging={handleYearChanging} setList={props.setList} />
      {!props.filteredList.length && <NoExpenses />}
      <ul className={styles.list}>
        {props.filteredList.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            date={item.date}
            title={item.title}
            price={item.price}
            list={props.list}
            setList={props.setList}
          />
        ))}
      </ul>
    </>
  )
}

export default List
