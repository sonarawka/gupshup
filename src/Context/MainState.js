import React, { useState } from 'react'
import mainContext from './mainContext'

const MainState = (props) => {
  const [currentHashId, setcurrentHashId] = useState(null)
  const [newChat, setNewChat] = useState(false)
  const [profiledetail, setprofiledetail] = useState(false)
  const newchatToggle=()=>{
    if(newChat){
      setNewChat(false)
    }

    else{
      setNewChat(true)
    }
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
    <mainContext.Provider value={{currentHashId, setcurrentHashId, newchatToggle, profileToggle, newChat, profiledetail}}>{props.children}</mainContext.Provider>
  )
}

export default MainState