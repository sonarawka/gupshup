import React, { useState } from 'react'
import './ChatMsgBox.css'
import db from '../../Firebase'
import { addDoc, collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
const ChatMsgBox = (props) => {
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
        console.log("abja",message)
    }

    const sendMsg = (msg)=>{
        console.log(props.id)
        const msgRef = collection(db, "chats", props.id, "messages");
        // getDocs(msgRef).then((res)=>{
        //     console.log(
        //         res.docs.map((e)=>({
        //             id:e.id, 
        //             data:e.data()
        //         }))
        //     )
        // })
        addDoc(msgRef, { name: "Sona" , message: msg , timestamp: Timestamp.fromDate(new Date())}); 
    }
   

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