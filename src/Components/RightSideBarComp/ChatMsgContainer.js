import React, { useContext, useEffect, useRef, useState } from 'react'
import './ChatMsgContainer.css'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase'
import mainContext from '../../Context/mainContext'
import parse from 'html-react-parser';

const ChatMsgContainer = (props) => {
    const bottom = useRef(null)
    const scrolltoBottom = () => {
        bottom.current.scrollIntoView({ behaviour: "smooth" })
    }
    const context = useContext(mainContext)
    const { currentHashId, emoji } = context
    const [message, setMessage] = useState([])
    
    useEffect(() => {
        const chatRef = collection(db, "Chats", currentHashId, "messages")
        const observer = onSnapshot(query(chatRef, orderBy("timestamp", "asc")), docSnapshot => {
            setMessage(
                docSnapshot.docs.map((e) => ({
                    id: e.id,
                    data: e.data()
                }))
            )
            
        })
        return () => {
            observer()
        }
    }, [currentHashId])

    useEffect(() => {
        scrolltoBottom()
    }, [message])

    return (
        <div className={`emoji-animation ${!emoji ? "chat-detail-message-area" : "chat-detail-message-area-emoji"}`}>
            <div className="encrypted-div">
                <p className="encrypted">
                    <i className="fa-solid fa-lock encrypted-lock"></i> &nbsp; Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
                </p>
            </div>

            {message.map((e) => (
                <div className={`${e.data.name === props.USERname ? "Sona-div" : "Amit-div"}`}>
                    <p className={`${e.data.name === props.USERname ? "Sona" : "Amit"}`}>{parse(e.data.message)} <sub className='message-timestamp'>{new Date(e.data.timestamp.toDate()).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' })}</sub>
                    </p>
                </div>))

            }
            {/* <div className="Amit-div"><p className="Amit">Hello there 👋</p></div>
            <div className="Sona-div"><p className="Sona">Hi</p></div> */}

            <div ref={bottom} />
        </div>
    )
}

export default ChatMsgContainer