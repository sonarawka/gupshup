import React, { useContext, useEffect, useState } from 'react'
import './Rightsidebar.css'
import ChatHeader from './RightSideBarComp/ChatHeader'
import ChatMsgBox from './RightSideBarComp/ChatMsgBox'
import ChatMsgContainer from './RightSideBarComp/ChatMsgContainer'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import ContactDetails from './RightSideBarComp/ContactDetails'
import Emoji from './Emoji/Emoji'
import mainContext from '../Context/mainContext'
const Rightsidebar = () => {
    const context = useContext(mainContext)
    const { emojitoggle, emoji, setemoji, togglePersonDetail, togglePerDetail } = context
    const param = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const {name, profile} = location.state
  

    useEffect(() => {
        if(!localStorage.getItem("email")){
            navigate('/')
          }
    }, [])
    return (
        <React.Fragment>
        <div className={`right-sidebar ${togglePersonDetail?"right-sidebar-half": ""}`}>
                <ChatHeader email={param.id} toggleDetail={togglePerDetail} name={name} profile={profile}/>
                <ChatMsgContainer USERname={localStorage.getItem("USERname")} name={name} id = {param.id}/>
                {emoji &&<Emoji/>}
                <ChatMsgBox USERname={localStorage.getItem("USERname")} id={param.id}/>
        </div>

         {togglePersonDetail && <div className={`person-details`}>
            <ContactDetails email={param.id}/>
        </div>}
        </React.Fragment>
    )
}

export default Rightsidebar