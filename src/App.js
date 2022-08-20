import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Login from './Components/Login'


const App = () => {
  return (
      <BrowserRouter>
        <div className="main">
              <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/home/*" exact element={<Home />} />
              </Routes>
            </div>
      </BrowserRouter>
   
  )
}

export default App