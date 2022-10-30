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
    const {setcurrentHashId, togglePerDetail, togglePersonDetail, markAsRead}=context
    const uid = "/home/chats/" + id
    const [lastmsg, setlastmsg] = useState("")
    const [lastMsgTime, setlastMsgTime] = useState("")
    let hash =""

        const hashgenerate =(id, myEmail)=>{
            if(togglePersonDetail){
                togglePerDetail()
            }
            
           
            
            if(myEmail.localeCompare(id)<0){
                hash = MD5(id+myEmail).toString()
                markAsRead(hash, name)
              setcurrentHashId(MD5(id+myEmail).toString());
            }
            else{
                hash = MD5(myEmail+id).toString()
                markAsRead(hash, name)
                
              setcurrentHashId(MD5(myEmail+id).toString());
    
            }
        }

      useEffect(() => {
      

        hashgenerate(id, myEmail)
        const chatRef = collection(db, "Chats", hash, "messages")
        const observer = onSnapshot(query(chatRef, orderBy("timestamp", "asc")), docSnapshot => {
            
            const docLength=docSnapshot.docs.length
            const docData = docSnapshot.docs[docLength-1].data()
            setlastmsg(
                docData.message
            )
            setlastMsgTime(new Date(docData.timestamp.toDate()).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' }))

        })
        return () => {
            observer()
        }
         // eslint-disable-next-line
      }, [id, myEmail])
      

    return (
        <Link onClick={()=>{hashgenerate(id, myEmail)}} to={`/home/chats/${id}`} state={{name:name, profile:profile}} className={`chat-item ${uid===location.pathname?"active":""}`}>
            <div className="chat-item-profile-pic"><img alt=""
                src={profile} />
            </div>
            <div className="chat-item-detail">
                <div className="chat-item-text">
                    <h4 className="chat-item-name">{name}</h4>
                    <p className="chat-item-timestamp">{lastMsgTime}</p>
                </div>
                <div className="chat-item-text">
                    <div className="chat-item-lastmsg">{((lastmsg)).length<50?parse(lastmsg):(parse(lastmsg.slice(0,47)+'...'))}</div>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>
        </Link>
    )
}

export default ChatItem