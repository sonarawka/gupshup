import React from 'react'
import Header from './LeftsidebarComp/Header'
import './Leftsidebar.css'
import Notificationbar from './LeftsidebarComp/Notificationbar'
import Searchbar from './LeftsidebarComp/Searchbar'
import ChatContainer from './LeftsidebarComp/ChatContainer'
const Leftsidebar = () => {
    
    return (
        <div className="left-sidebar">
            <Header />
            <Notificationbar />
            <Searchbar />
            <ChatContainer/>
        </div>
  )
}

export default Leftsidebar