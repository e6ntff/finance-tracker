import React, { useState } from 'react'
import styles from './ListItem.module.css'

import getTodayDate from '../../utils/date'

const ListItem = (props) => {
  const deleteItem = (id) => {
    props.setList(props.list.filter((item) => item.id !== id))
  }

  const { id, date, title, price } = props

  const [item, updateItem] = useState({
    id: id,
    date: date,
    title: title,
    price: price,
  })
  
  const handleItemChange = (event) => {
    const { name, value } = event.target

    updateItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }))
    updateList()
  }

  const updateList = () => {
    const listCopy = props.list.map((el) => {
      if (el.id === item.id) {
        return item
      }
      return el
    })
    props.setList(listCopy)
  }

  return (
    <li className={styles.item}>
      <input
        type="date"
        name="date"
        className={styles.date}
        value={item.date}
        min="2020-01-01"
        max={getTodayDate(new Date())}
        onChange={handleItemChange}
      />
      <input
        type="text"
        name="title"
        className={styles.title}
        value={item.title}
        onChange={handleItemChange}
      />
      <div className={styles.other}>
        <input
          type="number"
          name="price"
          min="1"
          step="1"
          className={styles.price}
          value={item.price}
          onChange={handleItemChange}
        />
        <button className={styles.button} onClick={() => deleteItem(props.id)}>
          🗑
        </button>
      </div>
    </li>
  )
}

export default ListItem
