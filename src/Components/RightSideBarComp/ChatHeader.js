import React, { useContext, useEffect } from 'react'
import mainContext from '../../Context/mainContext'
import './ChatHeader.css'
const ChatHeader = (props) => {
    const {name, profile, email, type} = props
    const context = useContext(mainContext)
    const {lastSeen, getLastSeen} = context;

    useEffect(() => {
        getLastSeen(email, type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email])
    
    return (
        <div onClick={props.toggleDetail} className="chat-detail-header">
            <div className="profile-div-container">
               <img className="profile-pic-small"
                    src={profile} alt=""/>
        
                <div className="chat-header-text">
                    <h4 className="chat-header-name">{name}</h4>
                    <p className='chat-header-lastseen'>{lastSeen}</p>
                </div>
            </div> 
            <div className="chat-menu-bar-icon">
                <div><i className="fa-solid fa-magnifying-glass"></i></div>
                <div className="menu-icon-div"><i className="fa-solid fa-ellipsis-vertical "></i></div>

            </div>
        </div>
    )
}

export default ChatHeader