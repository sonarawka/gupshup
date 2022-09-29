import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './ChatItem.css'
import MD5 from 'crypto-js/md5';
import mainContext from '../../Context/mainContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from '../../Firebase'
import parse from 'html-react-parser';

const ChatItem = (props) => {
    const {id, name, profile, myEmail}=props;
    const location = useLocation()
    const context = useContext(mainContext)
    const {setcurrentHashId, currentHashId}=context
    const uid = "/home/chats/" + id
    const [lastmsg, setlastmsg] = useState("")


      useEffect(() => {
        let hash =""
        // console.log(localStorage.getItem("email"))
        if(myEmail.charAt(0)>id.charAt(0)){
            hash = MD5(id+myEmail).toString()
          setcurrentHashId(MD5(id+myEmail).toString());
        }
        else{
            hash = MD5(myEmail+id).toString()

          setcurrentHashId(MD5(myEmail+id).toString());

        }
        console.log(hash, id,"value")
        const chatRef = collection(db, "Chats", hash, "messages")
        const observer = onSnapshot(query(chatRef, orderBy("timestamp", "asc")), docSnapshot => {
            
            const docLength=docSnapshot.docs.length
            setlastmsg(
                docSnapshot.docs[docLength-1].data().message
            )
        })
        return () => {
            observer()
        }
        
      }, [id])
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
                    <p className="chat-item-lastmsg">{parse(lastmsg)}</p>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>
        </Link>
    )
}

export default ChatItem