import React, { useState } from 'react'
import ListItem from '../ListItem/ListItem'
import styles from './List.module.css'
import Select from '../Select/Select'

const List = (props) => {
  const [year, setYear] = useState(2023)
  
  const handleYearChanging = (event) => {
    setYear(Number(event.target.value))
  }

  return (
    <>
      <Select handleYearChanging={handleYearChanging} />
      <ul className={styles.list}>
        {props.list.map((item) => {
          if (new Date(item.date).getFullYear() === year)
            return (
              <ListItem
                key={item.id}
                id={item.id}
                date={item.date}
                title={item.title}
                price={item.price}
                list={props.list}
                setList={props.setList}
              />
            )
        })}
      </ul>
    </>
  )
}

export default List
