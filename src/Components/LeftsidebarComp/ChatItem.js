import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './ChatItem.css'


const ChatItem = (props) => {
    const {id, name, profile}=props;
    const location = useLocation()
    
    const uid = "/home/chats/" + id

    return (
        <Link to={`/home/chats/${id}`} state={{name:name, profile:profile}} className={`chat-item ${uid===location.pathname?"active":""}`}>
            <div className="chat-item-profile-pic"><img alt=""
                src={profile} />
            </div>
            <div className="chat-item-detail">
                <div className="chat-item-text">
                    <h4 className="chat-item-name">{name}</h4>
                    <p className="chat-item-timestamp">9:03 am</p>
                </div>
                <div className="chat-item-text">
                    <p className="chat-item-lastmsg">Hi There!</p>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>
        </Link>
    )
}

export default ChatItem