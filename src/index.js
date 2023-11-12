import React from 'react'
import ReactDOM from 'react-dom/client'

import './settings/variables.scss'
import './vendor/fonts.scss'
import './index.scss'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
