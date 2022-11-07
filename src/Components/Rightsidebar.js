import React, { useContext, useEffect } from 'react'
import './Rightsidebar.css'
import ChatHeader from './RightSideBarComp/ChatHeader'
import ChatMsgBox from './RightSideBarComp/ChatMsgBox'
import ChatMsgContainer from './RightSideBarComp/ChatMsgContainer'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import ContactDetails from './RightSideBarComp/ContactDetails'
import Emoji from './Emoji/Emoji'
import mainContext from '../Context/mainContext'
import AttachmentFile from './RightSideBarComp/AttachmentFile'
const Rightsidebar = () => {
    const context = useContext(mainContext)
    const { emoji, togglePersonDetail, togglePerDetail, isFileAttached } = context
    const param = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const {name, profile, type} = location.state
  

    useEffect(() => {
        if(!localStorage.getItem("email")){
            navigate('/')
          }
          // eslint-disable-next-line
    }, [])
    return (
        <React.Fragment>
        <div className={`right-sidebar ${togglePersonDetail?"right-sidebar-half": ""}`}>
                <ChatHeader type={type} email={param.id} toggleDetail={togglePerDetail} name={name} profile={profile}/>
                {!isFileAttached && <ChatMsgContainer USERname={localStorage.getItem("USERname")} name={name} id = {param.id}/>}
                {isFileAttached && <AttachmentFile/>}
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