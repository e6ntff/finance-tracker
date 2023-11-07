import React, { useState } from 'react'

import './App.css'

import List from './components/List/List'
import AddForm from './components/AddForm/AddForm'

const App = () => {
  const [list, setList] = useState([
    {
      id: Math.random(),
      date: '1 Nov 2023',
      title: 'Phone',
      price: 999,
    },
    {
      id: Math.random(),
      date: '1 Nov 2023',
      title: 'Phone',
      price: 999,
    },
    {
      id: Math.random(),
      date: '1 Nov 2023',
      title: 'Phone',
      price: 999,
    },
  ])

  return (
    <>
      <AddForm list={list} setList={setList} />
      <List list={list} />
    </>
  )
}

export default App
