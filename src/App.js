import React, { useState } from 'react'

import './App.css'

import List from './components/List/List'
import AddForm from './components/AddForm/AddForm'

const App = () => {
  const [list, setList] = useState([
    {
      id: 1,
      title: '1',
      price: 1,
      date: '1',
    },
    {
      id: 2,
      title: '1',
      price: 1,
      date: '1',
    },
    {
      id: 3,
      title: '1',
      price: 1,
      date: '1',
    },
  ])

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id))
  }

  return (
    <>
      <AddForm list={list} setList={setList} />
      <List list={list} deleteItem={deleteItem} />
    </>
  )
}

export default App
