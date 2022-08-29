import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Loader from './Components/Loader'
import Login from './Components/LoginForm/Login'
import MainState from './Context/MainState'
import Test from './Test'


const App = () => {
  return (
    <MainState>
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
            <Route path="/loading/" exact element={<Loader />} />
            <Route path="/test/" exact element={<Test />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MainState>
  )
}

export default App