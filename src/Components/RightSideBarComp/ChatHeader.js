import React from 'react'
import './ChatHeader.css'
const ChatHeader = (props) => {
    const {name, profile} = props
    return (
        <div onClick={props.toggleDetail} className="chat-detail-header">
            <div className="profile-div-container">
               <img className="profile-pic-small"
                    src={profile} />
        
                <div className="chat-header-text">
                    <h4 className="chat-header-name">{name}</h4>
                    <p className='chat-header-lastseen'>online</p>
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