import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import mainContext from '../Context/mainContext'
import Leftsidebar from './Leftsidebar'
import Newchat from './Newchat'
import NewGroup from './NewGroupComp/NewGroup'
import NewGroupLeftsidebar from './NewGroupComp/NewGroupLeftsidebar'
import Profile from './Profile'
import Rightsidebar from './Rightsidebar'
import RightsidebarBanner from './RightsidebarBanner'

const Home = () => {
   const context = useContext(mainContext)
    const {newGroupDetails} = context
  return (
    <div className="main-container">
        <Leftsidebar/>
        {!newGroupDetails && <NewGroupLeftsidebar/>}
        {newGroupDetails && <NewGroup/>}
        <Newchat/>
        <Profile/>
        <Routes>
            <Route path='/' exact element={<RightsidebarBanner/>} />     
            <Route path='/chats/:id' exact element={<Rightsidebar/>}/>     
        </Routes> 
       
    </div>
  )
}

export default Home