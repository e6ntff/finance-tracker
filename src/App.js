import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import './App.scss'

import Header from './components/Header/Header'
import Expenses from './pages/Expenses/Expenses'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'

import sortByDate from './utils/sortByDate'
import paths from './settings/paths'

const App = () => {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('list')) || []
  )

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

  const handleYearChanging = (event) => {
    setYear(Number(event.target.value))
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={paths.home} />} />
          <Route
            path={paths.dashboard}
            element={
              <>
                <Header setList={setList} />
                <div className="app">
                  <Dashboard
                    filteredList={filteredList}
                    handleYearChanging={handleYearChanging}
                  />
                </div>
              </>
            }
          />
          <Route
            path={paths.expenses}
            element={
              <>
                <Header setList={setList} />
                <div className="app">
                  <Expenses
                    list={list}
                    setList={setList}
                    filteredList={filteredList}
                    setYear={setYear}
                    handleYearChanging={handleYearChanging}
                  />
                </div>
              </>
            }
          />
          <Route
            path={paths.home  }
            element={
              <>
                <Header setList={setList} />
                <div className="app">
                  <Home list={list} />
                </div>
              </>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
