import React, { useContext, useEffect, useState } from 'react'
import './ChatMsgBox.css'
import db from '../../Firebase'
import { addDoc, collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import mainContext from '../../Context/mainContext';
const ChatMsgBox = (props) => {
    const context = useContext(mainContext)
    const {currentHashId}=context
    const [message, setMessage] = useState("")
    const inputHandler = (event)=>{
        event.preventDefault()
        setMessage(event.target.value)
        // console.log(message)
    }
    const formHandler = (event)=>{
        event.preventDefault()
        sendMsg(message)
        setMessage("")
        
    }

    const sendMsg = (msg)=>{
        const msgRef = collection(db, "Chats", currentHashId, "messages");
        
        addDoc(msgRef, { name: props.USERname , message: msg , timestamp: Timestamp.fromDate(new Date()), read:false, recieved: false, media:null}); 
    }
   
    useEffect(() => {
      
    }, [])
    
    return (
        <div className="chat-detail-message-box">
            <i className="fa-regular fa-face-grin"></i>
            <i className="fa-solid fa-paperclip"></i>
            <form className='chat-detail-message-form' onSubmit={formHandler}>
                <input onChange={inputHandler} value={message} className="chat-detail-message-input-box" type="text" placeholder="Type a message" />
            </form>
            <i className="fa-solid fa-microphone"></i>
        </div>
    )
}

export default ChatMsgBox