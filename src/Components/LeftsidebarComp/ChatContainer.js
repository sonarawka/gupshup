import React, { useEffect, useState } from 'react'
import './ChatContainer.css'
import ChatItem from './ChatItem'
import {collection, getDocs, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase'

const ChatContainer = () => {
    const [chats, setchats] = useState()

    const getChats = () =>{
        
        // getDocs(chatRef).then((res)=>{
        //     setchats(
        //         res.docs.map((e)=>({
        //             id:e.id, 
        //             data:e.data()
        //         }))
        //     )
        // })
        
    }

    useEffect(() => {
        const chatRef = collection(db, "chats")
        const observer = onSnapshot(chatRef, docSnapshot => {
            setchats(
                docSnapshot.docs.map((e)=>({
                    id:e.id, 
                    data:e.data()
                }))
            )
            console.log(`Received doc snapshot: ${docSnapshot}`);
            // ...
          }, err => {
            console.log(`Encountered error: ${err}`);
          })
          
          return ()=>{
            observer()
          }

    }, [])
    
    return (
        <div className="chat-item-container"> 
            {chats && chats.map((e)=>{
                return(
                    <ChatItem key={e.id} id={e.id} name={e.data.name} profile={e.data.profile}/>
                )
            })}
            
            
        </div>
    )
}

export default ChatContainer