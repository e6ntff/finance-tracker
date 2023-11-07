import React, { useState } from 'react'

import styles from './AddForm.module.css'

import formatDate from '../../utils/date'

const AddForm = (props) => {
  const [newItem, setNewItem] = useState({
    id: Math.random(),
    title: '',
    date: '',
    price: 0,
  })

  const addNewItem = (event) => {
		event.target.reset()
    event.preventDefault()
    props.setList([newItem, ...props.list])
    setNewItem({
      id: Math.random(),
      title: '',
      date: '',
      price: 0,
    })
  }

  const handleFormChange = (event) => {
    const newItemCopy = newItem
		console.log(event.target.min)
    newItemCopy[event.target.name] = event.target.value
		newItemCopy.date = formatDate(newItemCopy.date).format
    setNewItem(newItemCopy)
  }

  return (
    <form className={styles.form} onSubmit={addNewItem}>
      <label className={styles.label} htmlFor="title">
        Title
      </label>
      <input
        required
        className={styles.input}
        type="text"
        name="title"
        onChange={handleFormChange}
      />
      <label className={styles.label} htmlFor="price">
        Price
      </label>
      <input
        required
        className={styles.input}
        type="number"
        min="1"
        step="1"
        name="price"
        onChange={handleFormChange}
      />
      <label className={styles.label} htmlFor="date">
        Date
      </label>
      <input
        required
        className={styles.input}
        type="date"
        name="date"
				min='1970-01-01'
				max={formatDate(new Date()).today}
        onChange={handleFormChange}
      />
      <div className={styles.buttons}>
        <button type="submit" className={styles.button}>
          Add
        </button>
        <button type="button" className={styles.button}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddForm
