import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Loader from './Components/Loader'
import Login from './Components/LoginForm/Login'
import MediaModal from './Components/MediaModal/MediaModal'
import mainContext from './Context/mainContext'
import Test from './Test'



const App = () => {
  const context = useContext(mainContext)
    const {  mediaModal } = context

    useEffect(() => {
  
    }, [mediaModal])

  return (
    
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
            <Route path="/loading/" exact element={<Loader />} />
            <Route path="/test/" exact element={<Test />} />
          </Routes>
          
        </div>
        {mediaModal && <MediaModal/>}
      </BrowserRouter>
   
  )
}

export default App