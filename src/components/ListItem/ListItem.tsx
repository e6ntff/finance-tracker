import React, { useState, useEffect, useContext } from 'react'
import styles from './ListItem.module.scss'

import getTodayDate from '../../utils/date'

import { CurrencyContext } from '../CurrencyContext/CurrencyContext'
import getSymbol from '../../utils/currency'

const ListItem: React.FC<any> = (props) => {
  const deleteItem = (id: number) => {
    props.setList(props.list.filter((item: ExpenseItem) => item.id !== id))
  }

  const { id, date, title, price } = props

  const [item, setItem] = useState({
    id: id,
    date: date,
    title: title,
    price: price,
  })

  const handleItemChange = (event: any) => {
    let { name, value }: {name: string; value: string | number} = event.target

    if (name === 'price') value = Number(value)

    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }))
  }

  useEffect(() => {
    props.setList(props.list.map((el: ExpenseItem) => (el.id === item.id ? item : el)))
  }, [item])

  const { currency } = useContext(CurrencyContext)

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
        <span className={styles.symbol}>{getSymbol(currency)}</span>
        <input
          type="number"
          name="price"
          min="1"
          step="1"
          className={styles.price}
          value={Math.round(Number(item.price[currency]))}
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
