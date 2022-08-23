import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Login from './Components/LoginForm/Login'
import MainState from './Context/MainState'


const App = () => {
  return (
    <MainState>
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MainState>
  )
}

export default App