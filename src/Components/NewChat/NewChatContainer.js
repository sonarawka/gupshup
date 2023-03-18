import React, { useEffect, useState } from 'react'
import NewChatItem from './NewChatItem'
import {collection, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase'

const NewChatContainer = (props) => {
  const [users, setusers] = useState()
  const [myemail, setMyemail] = useState("")
  useEffect(() => {
    setMyemail(localStorage.getItem("email"))
    const UserRef = collection(db, "Users")
    const observer = onSnapshot(UserRef, docSnapshot => {
        setusers(
            docSnapshot.docs.map((e)=>({
                id:e.id, 
                data:e.data()
            }))
        )
        
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
            <NewChatItem myemail={myemail} email={e.data.email} key={e.id} id={e.id} name={e.data.fullName} profile={e.data.profile}/>
        )
    })}
    
    
</div>
  )
}

export default NewChatContainer