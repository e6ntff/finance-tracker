import React, { useEffect, useState } from 'react'

import './App.scss'

import Header from './components/Header/Header'
import List from './components/List/List'
import AddForm from './components/AddForm/AddForm'
import Diagram from './components/Diagram/Diagram'

import getList from './api/getList'
import sortByDate from './utils/sortByDate'

const App = () => {
  localStorage.setItem('list', JSON.stringify([]))
  const [list, setList] = useState([])

  const [year, setYear] = useState(2023)

  const [filteredList, setFilteredList] = useState(
    list.filter((item) => new Date(item.date).getFullYear() === year)
  )

  useEffect(() => {
    getList().then(data => setList(data))
  }, [])

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
      <Header setList={setList}/>
      <div className='app'>
        <AddForm list={list} setList={setList} />
        <Diagram filteredList={filteredList} />
        <List
          list={list}
          setList={setList}
          filteredList={filteredList}
          setYear={setYear}
        />
      </div>
    </>
  )
}

export default App
