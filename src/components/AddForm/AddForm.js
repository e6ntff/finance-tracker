import React, { useState } from 'react'

import styles from './AddForm.module.css'

import getTodayDate from '../../utils/date'

const AddForm = (props) => {
  const [newItem, setNewItem] = useState({
    id: Math.random(),
    title: '',
    date: getTodayDate(new Date()),
    price: '',
  })

  const addNewItem = (event) => {
    event.target.reset()
    event.preventDefault()
    props.setList([newItem, ...props.list])
    setNewItem({
      id: Math.random(),
      title: '',
      date: '',
      price: '',
    })
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }))
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
        value={newItem.title}
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
        value={newItem.price}
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
        min="2020-01-01"
        max={getTodayDate(new Date())}
        value={newItem.date}
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
