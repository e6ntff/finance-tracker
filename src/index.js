import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import getList from './api/getList'

getList().then((data) => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <App initialExpenses={data} />
    </React.StrictMode>
  )
})
