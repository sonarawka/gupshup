import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Leftsidebar from './Leftsidebar'
import Newchat from './Newchat'
import Rightsidebar from './Rightsidebar'
import RightsidebarBanner from './RightsidebarBanner'

const Home = () => {
  const [newChat, setNewChat] = useState(false)
  const toggle=()=>{
    if(newChat){
      setNewChat(false)
    }
    else{
      setNewChat(true)
    }
  }
  return (
    <div className="main-container">
        <Leftsidebar newChat={newChat} toggle={toggle}/>
        <Newchat newChat={newChat} toggle={toggle}/>
        <Routes>
            <Route path='/' exact element={<RightsidebarBanner/>} />     
            <Route path='/chats/:id' exact element={<Rightsidebar/>}/>     
        </Routes> 
        
    </div>
  )
}

export default Home