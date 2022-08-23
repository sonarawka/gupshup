import React, {useContext, useEffect, useState } from 'react'
import './ChatMsgContainer.css'
import {collection, collectionGroup, listCollections, getDoc, doc, getDocs, query, orderBy, onSnapshot} from 'firebase/firestore'
import db from '../../Firebase'
import mainContext from '../../Context/mainContext'

const ChatMsgContainer = (props) => {
    const context = useContext(mainContext)
    const {currentHashId}=context
    const [message, setMessage] = useState([])
    
    useEffect(() => {
        const chatRef = collection(db, "Chats", currentHashId, "messages")
        const observer  = onSnapshot(query(chatRef, orderBy("timestamp", "asc")), docSnapshot =>{
            setMessage(
                docSnapshot.docs.map((e)=>({
                            id:e.id, 
                            data:e.data()
                        }))
                    )
        })

    }, [currentHashId])

    return (
        <div className="chat-detail-message-area">
            <div className="encrypted-div"><p className="encrypted"><i className="fa-solid fa-lock encrypted-lock"></i> &nbsp; Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.</p></div>
            {message.map((e)=>(<div className={`${e.data.name===props.USERname?"Sona-div":"Amit-div"}`}><p className={`${e.data.name===props.USERname?"Sona":"Amit"}`}>{e.data.message}</p></div>))}
            {/* <div className="Amit-div"><p className="Amit">Hello there 👋</p></div>
            <div className="Sona-div"><p className="Sona">Hi</p></div> */}
            

        </div>
    )
}

export default ChatMsgContainer