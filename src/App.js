import React, { useEffect, useState } from 'react'

import './App.scss'

import Header from './components/Header/Header'

import getList from './api/getList'
import sortByDate from './utils/sortByDate'
import Expenses from './pages/Expenses/Expenses'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {
  localStorage.setItem('list', JSON.stringify([]))
  const [list, setList] = useState([])

  const [year, setYear] = useState(2023)

  const [filteredList, setFilteredList] = useState(
    list.filter((item) => new Date(item.date).getFullYear() === year)
  )

  useEffect(() => {
    getList().then((data) => setList(data))
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

  const handleYearChanging = (event) => {
    setYear(Number(event.target.value))
  }

  return (
    <>
      <Header setList={setList} />
      <div className="app">
        <Dashboard
          filteredList={filteredList}
          handleYearChanging={handleYearChanging}
        />
        <Expenses
          list={list}
          setList={setList}
          filteredList={filteredList}
          setYear={setYear}
          handleYearChanging={handleYearChanging}
        />
      </div>
    </>
  )
}

export default App
