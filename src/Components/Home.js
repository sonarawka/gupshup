import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Leftsidebar from './Leftsidebar'
import Newchat from './Newchat'
import Rightsidebar from './Rightsidebar'
import RightsidebarBanner from './RightsidebarBanner'

const Home = () => {

  return (
    <div className="main-container">
        <Leftsidebar/>
        <Newchat/>
        <Routes>
            <Route path='/' exact element={<RightsidebarBanner/>} />     
            <Route path='/chats/:id' exact element={<Rightsidebar/>}/>     
        </Routes> 
        
    </div>
  )
}

export default Home