import React, { useEffect, useState } from 'react'
import './ChatContainer.css'
import ChatItem from './ChatItem'
import {collection, getDocs, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase'

const ChatContainer = () => {
    const [chats, setchats] = useState()
    const [myEmail, setMyEmail] = useState("")
    const [groups, setGroups] = useState()

    useEffect(() => {
        const myemail = localStorage.getItem("email")
        const chatRef = collection(db, "Users", myemail, "contact")
        const groupRef = collection(db, "Users", myemail, "Groups")

        const groupobserver = onSnapshot(groupRef, docSnapshot => {
            setGroups(
                docSnapshot.docs.map((e)=>({
                    gid:e.id, 
                    data:e.data()
                }))
            )
          
            // ...
          }, err => {
            console.log(`Encountered error: ${err}`);
          })
          

        const observer = onSnapshot(chatRef, docSnapshot => {
            setchats(
                docSnapshot.docs.map((e)=>({
                    id:e.id, 
                    data:e.data()
                }))
            )
          
            // ...
          }, err => {
            console.log(`Encountered error: ${err}`);
          })
        setMyEmail(myemail)
          
          return ()=>{
            observer()
            groupobserver()
          }

    }, [])
    
    return (
        <div className="chat-item-container"> 
            {chats && chats.map((e)=>{
                return(
                    <ChatItem type="chat" myEmail={myEmail} key={e.id} id={e.id} name={e.data.name} profile={e.data.profile}/>
                )
            })}

            {groups && groups.map((e)=>{
                return(
                    <ChatItem type="group" myEmail={myEmail} key={e.gid} id={e.gid} name={e.data.groupName} profile={e.data.profile}/>
                )
            })}
            
            
        </div>
    )
}

export default ChatContainer