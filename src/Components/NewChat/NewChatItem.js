import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NewChatItem = (props) => {
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
                  
                </div>
                
            </div>
        </Link>
  )
}

export default NewChatItem