import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rightsidebar'
import RightsidebarBanner from './RightsidebarBanner'

const Home = () => {
  return (
    <div className="main-container">
        <Leftsidebar/>
        <Routes>
            <Route path='/' exact element={<RightsidebarBanner/>} />     
            <Route path='/chats/:id' exact element={<Rightsidebar/>}/>     
        </Routes>
        
    </div>
  )
}

export default Home