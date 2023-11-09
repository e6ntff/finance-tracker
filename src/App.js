import React, { useEffect, useState } from 'react'

import './App.css'

import List from './components/List/List'
import AddForm from './components/AddForm/AddForm'
import Diagram from './components/Diagram/Diagram'

import sortByDate from './utils/sortByDate'

const App = () => {
  const [list, setList] = useState(
    sortByDate([
      {
        id: 1,
        title: 'Phone',
        price: 1,
        date: '2021-09-01',
      },
      {
        id: 2,
        title: '2',
        price: 1,
        date: '2023-11-01',
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
  )

  const [year, setYear] = useState(2023)

  const [filteredList, setFilteredList] = useState(list.filter((item) => new Date(item.date).getFullYear() === year))

  useEffect(() => {
    setList(sortByDate(list))
  }, [list])

  useEffect(() => {
    setFilteredList(list.filter((item) => new Date(item.date).getFullYear() === year))
  }, [year])

  return (
    <>
      <AddForm list={list} setList={setList} />
      <Diagram filteredList={filteredList}/>
      <List list={list} setList={setList} filteredList={filteredList} setYear={setYear}/>
    </>
  )
}

export default App
