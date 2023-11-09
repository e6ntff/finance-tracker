import React from 'react'
import ReactDOM from 'react-dom/client'

import './vendor/variables.scss'
import './vendor/fonts.scss'
import './index.scss'

import getList from './api/getList'

import App from './App'

getList().then((data) => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <App initialExpenses={data} />
    </React.StrictMode>
  )
})
