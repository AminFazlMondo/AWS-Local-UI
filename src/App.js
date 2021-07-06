import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Route from './Route'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </div>
  )
}

export default App
