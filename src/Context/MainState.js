import React, { useState } from 'react'
import mainContext from './mainContext'
import db from '../Firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const MainState = (props) => {
  const [personDetail, setPersonDetail] = useState({about:"", email:"", fullName:"", profile:"", phoneNo:""})
  const [currentHashId, setcurrentHashId] = useState(null)
  const [newChat, setNewChat] = useState(false)
  const [profiledetail, setprofiledetail] = useState(false)
  const [emoji, setemoji] = useState(false)
  const [message, setMessage] = useState("")
  const [lastSeen, setLastSeen] = useState("Click here to get more detail")
  
  const getTimeDiff=(ls)=>{
    
      const currentTime = new Date()
      console.log(ls, "lastseen")
      console.log(currentTime, "currenttIME")
      const timeDiff=(currentTime.getTime() - ls.getTime())/1000
      if (timeDiff<12){
        return "Online"
      }
      else{
        return (ls.toLocaleString("en-IN", {day:'numeric', month: 'short', year: 'numeric' ,timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' }))
      }
    }
  
  const getLastSeen=(email)=>{
    console.log(email)

    getDoc(doc(db, "Users", email)).then((dataSnap)=>{
      setLastSeen(getTimeDiff(new Date(dataSnap.data().lastseen.toDate())))
    })

    
  }
  const setOnline=(email)=>{
    updateDoc(doc(db, "Users" ,email),{lastseen:new Date()})
  }
  
  

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
    <mainContext.Provider value={{currentHashId, setcurrentHashId, newchatToggle, profileToggle, newChat, profiledetail, emojitoggle, emoji, setemoji, setMessage, message, personDetail, getPersonDetail, lastSeen, getLastSeen, setOnline}}>{props.children}</mainContext.Provider>
  )
}

export default MainState