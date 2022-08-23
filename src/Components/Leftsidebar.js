import React, { useContext } from 'react'
import Header from './LeftsidebarComp/Header'
import './Leftsidebar.css'
import Notificationbar from './LeftsidebarComp/Notificationbar'
import Searchbar from './LeftsidebarComp/Searchbar'
import ChatContainer from './LeftsidebarComp/ChatContainer'
import mainContext from '../Context/mainContext'

const Leftsidebar = () => {
    const context = useContext(mainContext)
    const {newChat} = context
    return (
        <div className={`left-sidebar ${newChat?"hidden":""}`}>
            <Header/>
            <Notificationbar />
            <Searchbar />
            <ChatContainer/>
        </div>
  )
}

export default Leftsidebar