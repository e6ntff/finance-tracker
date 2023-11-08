import React, { useState } from 'react'

import './App.css'

import List from './components/List/List'
import AddForm from './components/AddForm/AddForm'
import Select from './components/Select/Select'

const App = () => {
  const [list, setList] = useState([
    {
      id: 1,
      title: '1',
      price: 1,
      date: '2023-07-01',
    },
    {
      id: 2,
      title: '1',
      price: 1,
      date: '2023-07-01',
    },
    {
      id: 3,
      title: '1',
      price: 1,
      date: '2023-07-01',
    },
  ])

  return (
    <>
      <AddForm list={list} setList={setList} />
      <Select />
      <List list={list} setList={setList} />
    </>
  )
}

export default App
