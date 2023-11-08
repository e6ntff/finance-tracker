import React, { useState, useEffect } from 'react'
import styles from './ListItem.module.css'

import getTodayDate from '../../utils/date'

const ListItem = (props) => {
  const deleteItem = (id) => {
    props.setList(props.list.filter((item) => item.id !== id))
  }

  const { id, date, title, price } = props

  const [item, setItem] = useState({
    id: id,
    date: date,
    title: title,
    price: price,
  })

  const handleItemChange = (event) => {
    const { name, value } = event.target

    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }))
  }

  const updateList = () => {
    props.setList(props.list.map((el) => (el.id === item.id ? item : el)))
  }
  useEffect(() => {
    updateList()
  }, [item])

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
