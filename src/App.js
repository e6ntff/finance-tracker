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
      date: '2021-07-01',
    },
    {
      id: 2,
      title: '2',
      price: 1,
      date: '2023-07-01',
    },
    {
      id: 3,
      title: '3',
      price: 1,
      date: '2023-07-01',
    },
    {
      id: 4,
      title: '4',
      price: 1,
      date: '2022-07-01',
    },
    {
      id: 5,
      title: '5',
      price: 1,
      date: '2022-07-01',
    },
  ])

  return (
    <>
      <AddForm list={list} setList={setList} />
      <List list={list} setList={setList} />
    </>
  )
}

export default App
