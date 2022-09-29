import React, { useContext, useEffect } from 'react'
import Header from './LeftsidebarComp/Header'
import './Leftsidebar.css'
import Notificationbar from './LeftsidebarComp/Notificationbar'
import Searchbar from './LeftsidebarComp/Searchbar'
import ChatContainer from './LeftsidebarComp/ChatContainer'
import mainContext from '../Context/mainContext'

const Leftsidebar = () => {
    const context = useContext(mainContext)
    const {newChat, profiledetail, setOnline} = context
    
    useEffect(() => {
       const myInterval = setInterval(()=>{setOnline(localStorage.getItem("email"))}, 10000);

       return () => {
        clearInterval(myInterval)
      }
    }, [])
    
    
    return (
        <div className={`left-sidebar ${newChat?"hidden":""} ${profiledetail?"hidden":""}`}>
            <Header/>
            <Notificationbar />
            <Searchbar />
            <ChatContainer/>
        </div>
  )
}

export default Leftsidebar