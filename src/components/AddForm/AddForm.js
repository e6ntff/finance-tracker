import React, { useState } from 'react'

import styles from './AddForm.module.css'

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

  const handleFormChange = (event, key) => {
    const newItemCopy = newItem
    newItemCopy[key] = event.target.value
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
        onChange={(event) => handleFormChange(event, 'title')}
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
        onChange={(event) => handleFormChange(event, 'price')}
      />
      <label className={styles.label} htmlFor="date">
        Date
      </label>
      <input
        required
        className={styles.input}
        type="date"
        name="date"
        onChange={(event) => handleFormChange(event, 'date')}
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
