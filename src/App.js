import React, { useEffect, useState } from 'react'

import './App.scss'

import List from './components/List/List'
import AddForm from './components/AddForm/AddForm'
import Diagram from './components/Diagram/Diagram'

import sortByDate from './utils/sortByDate'

const App = () => {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) || [])

  const [year, setYear] = useState(2023)

  const [filteredList, setFilteredList] = useState(
    list.filter((item) => new Date(item.date).getFullYear() === year)
  )

  useEffect(() => {
    setList(sortByDate(list))
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    setFilteredList(
      list.filter((item) => new Date(item.date).getFullYear() === year)
    )
  }, [year, list])

  return (
    <>
      <AddForm list={list} setList={setList} />
      <Diagram filteredList={filteredList} />
      <List
        list={list}
        setList={setList}
        filteredList={filteredList}
        setYear={setYear}
      />
    </>
  )
}

export default App
