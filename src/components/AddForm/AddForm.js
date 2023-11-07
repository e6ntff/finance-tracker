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
    event.preventDefault()
    props.setList([newItem, ...props.list])
    setNewItem({
      ...newItem,
      id: Math.random(),
    })
  }

  return (
    <form className={styles.form} onSubmit={addNewItem}>
      <label className={styles.label} htmlFor="title">
        Title
      </label>
      <input
        className={styles.input}
        type="text"
        name="title"
        onChange={(event) =>
          setNewItem({
            ...newItem,
            title: event.target.value,
          })
        }
      />
      <label className={styles.label} htmlFor="price">
        Price
      </label>
      <input
        className={styles.input}
        type="number"
        min="1"
        step="1"
        name="price"
        onChange={(event) =>
          setNewItem({
            ...newItem,
            price: event.target.value,
          })
        }
      />
      <label className={styles.label} htmlFor="date">
        Date
      </label>
      <input
        className={styles.input}
        type="date"
        name="date"
        onChange={(event) =>
          setNewItem({
            ...newItem,
            date: event.target.value,
          })
        }
      />
      <div className={styles.buttons}>
        <button type="submit" className={styles.button}>
          Add
        </button>
        <button className={styles.button}>Cancel</button>
      </div>
    </form>
  )
}

export default AddForm
