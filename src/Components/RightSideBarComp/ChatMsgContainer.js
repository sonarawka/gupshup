import React, { useContext, useEffect, useRef, useState } from 'react'
import './ChatMsgContainer.css'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import db from '../../Firebase'
import mainContext from '../../Context/mainContext'
import parse from 'html-react-parser';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Menu } from '@mui/material'
import pdf from '../../Assets/pdf.png'

const ChatMsgContainer = (props) => {
    const bottom = useRef(null)
    const scrolltoBottom = () => {
        bottom.current.scrollIntoView({ behaviour: "smooth" })
    }
    const context = useContext(mainContext)
    const [currentMsgId, setcurrentMsgId] = useState(null)
    const { currentHashId, emoji, markAsRead, mediaToggle } = context
    const [message, setMessage] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event, id) => {
        setcurrentMsgId(id)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };

    const deletemsgHandler =async ()=>{
    
        // const msgRef = collection(db, "Chats", currentHashId, "messages", currentMsgId)
        await deleteDoc(doc(db, "Chats", currentHashId, "messages", currentMsgId))
    }



    useEffect(() => {
        const chatRef = collection(db, "Chats", currentHashId, "messages")
        const observer = onSnapshot(query(chatRef, orderBy("timestamp", "asc")), docSnapshot => {
            markAsRead(currentHashId, props.name)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                
                <div key={e.id} className={`${e.data.name === props.USERname ? "Sona-div" : "Amit-div"}`}>
                    
                    <div className={`${e.data.name === props.USERname ? "Sona" : "Amit"}`}>
                        
                        {Object.keys(e.data.media).length!==0 && 
                        <>
                        {e.data.media.mtype.split("/")[0]==="image" ? <img width="300px" alt="" src={e.data.media.url} onClick={() => { mediaToggle(e.data.media.url) }}/> : <img width="300px" alt="" src={pdf} onClick={() => { mediaToggle(e.data.media.url) }} />}
                        
                        </>
                        }  
                                  
                        <div className='arrowDown'>{parse(e.data.message)}
                        <div onClick={(event)=>{handleClick(event, e.id)}}><KeyboardArrowDownIcon /></div>
                    </div><sub className='message-timestamp'>{new Date(e.data.timestamp.toDate()).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' })}
                            {props.USERname === e.data.name ? (
                                e.data.recieved === false ? (
                                    <DoneIcon sx={{ fontSize: 15 }} />
                                ) : e.data.recieved === true && e.data.read === false ? (
                                    <DoneAllIcon sx={{ fontSize: 15 }} />
                                ) : (
                                    <DoneAllIcon sx={{ fontSize: 15, color: "#3bc8ff" }} />
                                )
                            ) : (
                                ""
                            )}
                        </sub>
                    </div>

                </div>))

            }

            <div ref={bottom} />

            <Menu
                anchorEl={anchorEl}
                id="account-menu1"
                open={open}
                onClose={handleClose}
                onClick={handleClose}

            >
                <MenuItem>Reply</MenuItem>
                <MenuItem onClick={deletemsgHandler}>Delete Message</MenuItem>
            </Menu>
        </div>
    )
}

export default ChatMsgContainer