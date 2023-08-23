import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './index.scss'
import './custom.scss'
import App from './App'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
