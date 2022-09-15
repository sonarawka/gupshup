import React, { useState } from 'react'
import mainContext from './mainContext'
import db from '../Firebase'
import { doc, getDoc } from 'firebase/firestore'

const MainState = (props) => {
  const [personDetail, setPersonDetail] = useState({about:"", email:"", fullName:"", profile:"", phoneNo:""})
  const [currentHashId, setcurrentHashId] = useState(null)
  const [newChat, setNewChat] = useState(false)
  const [profiledetail, setprofiledetail] = useState(false)
  const [emoji, setemoji] = useState(false)
  const [message, setMessage] = useState("")
  const newchatToggle=()=>{
    if(newChat){
      setNewChat(false)
    }
    else{
      setNewChat(true)
    }
  }

  const emojitoggle=()=>{
    if(emoji){
      setemoji(false)
    }

    else{
      setemoji(true)
    }
  }

  const getPersonDetail =(email)=>{
    getDoc(doc(db, "Users", email)).then((dataSnap)=>{
      setPersonDetail({about:dataSnap.data().about, email:dataSnap.data().email, fullName:dataSnap.data().fullName, profile:dataSnap.data().profile, phoneNo:dataSnap.data().phoneNo})
    })
    
  } 

  const profileToggle=()=>{
    if(profiledetail){
      setprofiledetail(false)
    }

    else{
      setprofiledetail(true)
    }
  }
    
    
  return (
    <mainContext.Provider value={{currentHashId, setcurrentHashId, newchatToggle, profileToggle, newChat, profiledetail, emojitoggle, emoji, setemoji, setMessage, message, personDetail, getPersonDetail}}>{props.children}</mainContext.Provider>
  )
}

export default MainState