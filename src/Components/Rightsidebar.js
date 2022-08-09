import React, { useEffect, useState } from 'react'
import './Rightsidebar.css'
import ChatHeader from './RightSideBarComp/ChatHeader'
import ChatMsgBox from './RightSideBarComp/ChatMsgBox'
import ChatMsgContainer from './RightSideBarComp/ChatMsgContainer'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import Persondetails from './RightSideBarComp/Persondetails'
const Rightsidebar = () => {
    const [toggle, settoggle] = useState(false)
    const param = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const {name, profile} = location.state
    const toggleDetail = ( ) =>{
        if(!toggle){
            settoggle(true)
        }else{
            settoggle(false)
        }
    }
    useEffect(() => {
        if(!localStorage.getItem("email")){
            navigate('/')
          }
    }, [])
    return (
        <React.Fragment>
        <div className={`right-sidebar ${toggle?"right-sidebar-half": ""}`}>
                <ChatHeader toggleDetail={toggleDetail} name={name} profile={profile}/>
                <ChatMsgContainer USERname={localStorage.getItem("USERname")} name={name} id = {param.id}/>
                <ChatMsgBox id={param.id}/>
        </div>

         {toggle && <div className={`person-details`}>
            <Persondetails/>
        </div>}
        </React.Fragment>
    )
}

export default Rightsidebar