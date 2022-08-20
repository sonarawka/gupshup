import React, { useEffect, useState } from 'react'
import NewChatItem from './NewChatItem'
import {collection, getDocs, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase'

const NewChatContainer = () => {
  const [users, setusers] = useState()

  useEffect(() => {
    const UserRef = collection(db, "Users")
    const observer = onSnapshot(UserRef, docSnapshot => {
        setusers(
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
    {users && users.map((e)=>{
        return(
            <NewChatItem key={e.id} id={e.id} name={e.data.fullName} profile={e.data.profile}/>
        )
    })}
    
    
</div>
  )
}

export default NewChatContainer