import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import './App.scss'

import Header from './components/Header/Header'
import Expenses from './pages/Expenses/Expenses'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'
import { LanguageProvider } from './components/LanguageContext/LanguageContext'

import sortByDate from './utils/sortByDate'
import paths from './settings/paths'

const App = () => {
  if (!JSON.parse(localStorage.getItem('list')))
    localStorage.setItem('list', '[]')

  const [list, setList] = useState(
    sortByDate(JSON.parse(localStorage.getItem('list')))
  )

  const [year, setYear] = useState(2023)

  const filteredList = useMemo(
    () => list.filter((item) => new Date(item.date).getFullYear() === year),
    [year, list]
  )

  useEffect(() => {
    setList((prevList) => sortByDate(prevList))
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const handleYearChanging = useCallback((event) => {
    setYear(Number(event.target.value))
  }, [])

  return (
    <>
      <LanguageProvider>
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
                      year={year}
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
                      year={year}
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
              path={paths.home}
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
      </LanguageProvider>
    </>
  )
}

export default App
