import React, { useState } from 'react'

import styles from './AddForm.module.scss'

import getTodayDate from '../../utils/date'

const AddForm = (props) => {
  const [newItem, setNewItem] = useState({
    id: Math.random(),
    title: '',
    date: getTodayDate(new Date()),
    price: 0,
  })

  const clearItem = () => {
    setNewItem({
      id: Math.random(),
      title: '',
      date: getTodayDate(new Date()),
      price: 0,
    })
  }

  const addNewItem = (event) => {
    event.preventDefault()
    newItem.price = Number(newItem.price)
    props.setList((prevList) => [newItem, ...prevList])
    clearItem()
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }))
  }

  const [formAndButtonDisplay, setFormAndButtonDisplay] = useState({
    button: 'block',
    form: 'none',
  })

  const toggleFormDisplay = (isVisible) => {
    setFormAndButtonDisplay(
      isVisible
        ? { button: 'none', form: 'flex' }
        : { button: 'flex', form: 'none' }
    )
  }

  return (
    <>
      <button
        className={`${styles.button} ${styles.setButton}`}
        onClick={() => toggleFormDisplay(true)}
        style={{ display: formAndButtonDisplay.button }}
      >
        Add new expense
      </button>
      <form
        className={styles.form}
        onSubmit={addNewItem}
        style={{ display: formAndButtonDisplay.form }}
      >
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          required
          className={styles.input}
          type="text"
          name="title"
          id="title"
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
          id="price"
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
          id="date"
          min="2020-01-01"
          max={getTodayDate(new Date())}
          value={newItem.date}
          onChange={handleFormChange}
        />
        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.button}
            onClick={() => toggleFormDisplay(false)}
          >
            Add
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              toggleFormDisplay(false)
              clearItem()
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default AddForm