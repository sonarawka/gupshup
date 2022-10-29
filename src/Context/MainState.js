import React, { useState } from 'react'
import mainContext from './mainContext'
import db from '../Firebase'
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { MD5 } from 'crypto-js'


const MainState = (props) => {
  const [personDetail, setPersonDetail] = useState({about:"", email:"", fullName:"", profile:"", phoneNo:""})
  const [currentHashId, setcurrentHashId] = useState(null)
  const [newChat, setNewChat] = useState(false)
  const [profiledetail, setprofiledetail] = useState(false)
  const [emoji, setemoji] = useState(false)
  const [message, setMessage] = useState("")
  const [lastSeen, setLastSeen] = useState("Click here to get more detail")
  const [togglePersonDetail, settogglePersonDetail] = useState(false)
  const [uidarr, setUidarr] = useState([])
  const [receivedVal] = useState(null)
  const [attachfilesrc, setattachfilesrc] = useState("")
  const [attachfileUpload, setattachfileUpload] = useState("")
  const [isFileAttached, setIsFileAttached] = useState(false)
  const [sendIconChange, setSendIconChange] = useState(false)
  const [mediaModal, setMediaModal] = useState(false)
  const [mediaModalUrl, setMediaModalUrl] = useState("")
  const [newGroupActive, setNewGroupActive] = useState(false)
  const [currentGroupHashArr, setCurrentGroupHashArr] = useState([])
  const [groupUsersList, setgroupUsersList] = useState()
  

  const addParticipantsToGroup =(email, myemail, name, profile)=>{
    const newArray=groupUsersList.filter((e)=>e.data.profile!=profile)
    console.log(newArray)
    setgroupUsersList(newArray)
    
    if(myemail.localeCompare(email)<0){
      setCurrentGroupHashArr(currentGroupHashArr.concat({name:name, profile:profile, hash: MD5(email+myemail).toString()} ))
      
    }
    else{
      setCurrentGroupHashArr(currentGroupHashArr.concat({name:name, profile:profile, hash: MD5(myemail+email).toString()}))
    }
  }

  const newGroupToggle=()=>{
    
    if(newGroupActive){
      setNewGroupActive(false)
      setNewChat(true)
      setCurrentGroupHashArr([])

    }
    else{
      setNewGroupActive(true)
      setNewChat(false)
    }
    
  }

  const mediaToggle=(media)=>{
    console.log("abcd")
    if(mediaModal){
      setMediaModal(false)
    console.log("abcdelse")

    }
    else{
      setMediaModalUrl(media)
      setMediaModal(true)
    console.log("abcdif")

    }

  }

  const attachToggle=()=>{
    if(isFileAttached){
      setIsFileAttached(false)
      setattachfilesrc("")
    }
    else{
      setIsFileAttached(true)
    }
  }

  const attachment=(event)=>{
    console.log("attached")
    setattachfilesrc(URL.createObjectURL(event.target.files[0]))
    setattachfileUpload(event.target.files[0])

    attachToggle()
    setSendIconChange(true)
    event.target.value = ''
  }

  const togglePerDetail = ( ) =>{
    if(!togglePersonDetail){
      settogglePersonDetail(true)
    }else{
      settogglePersonDetail(false)
    }
}
  const getHash=(email, loggedInEmail)=>{
    if(loggedInEmail.localeCompare(email)<0){
      setcurrentHashId(MD5(email+loggedInEmail).toString());
    }
    else{
      setcurrentHashId(MD5(loggedInEmail+email).toString());
    }

  } 


  const getUidArr = (myemail)=>{
    if(myemail){

    
    const chatRef = collection(db, "Users", myemail, "contact")
    onSnapshot(chatRef, docSnapshot => {
      setUidarr(
          
          docSnapshot.docs.map((e)=>({
              uid:e.data().uid
          }))
      )
      
    
      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    })}
  }

  const markAsReceived= async (item)=>{
     
      const chatRef = collection(db, "Chats", item.uid, "messages")
      const observer = await getDocs(chatRef)
      observer.forEach((docData) => {
        // doc.data() is never undefined for query doc snapshots
        if(item.name!==localStorage.getItem("USERname"))
        updateDoc(doc(db, "Chats", item.uid, "messages",docData.id),{recieved:true})
      })

    
    
  }

  const markAsRead= async (hashId, name)=>{
     
    const chatRef = collection(db, "Chats", hashId, "messages")
    const observer = await getDocs(chatRef)
    observer.forEach((docData) => {
      // doc.data() is never undefined for query doc snapshots
      if(name===docData.data().name&&docData.data().name!==localStorage.getItem("USERname"))
      updateDoc(doc(db, "Chats", hashId, "messages",docData.id),{read:true})
    })
  
}


  const getTimeDiff=(ls)=>{
    
      const currentTime = new Date()
      const timeDiff=(currentTime.getTime() - ls.getTime())/1000
      if (timeDiff<12){
        return "Online"
      }
      else{
        return (ls.toLocaleString("en-IN", {day:'numeric', month: 'short', year: 'numeric' ,timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' }))
      }
    }
  
  const getLastSeen=(email)=>{
   

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
    <mainContext.Provider value={{currentHashId, setcurrentHashId, newchatToggle, profileToggle, newChat, profiledetail, emojitoggle, emoji, setemoji, setMessage, message, personDetail, getPersonDetail, lastSeen, getLastSeen, setOnline, getHash, togglePerDetail, togglePersonDetail, getUidArr, uidarr, markAsReceived, receivedVal, markAsRead, attachment, attachfilesrc, isFileAttached, attachToggle, sendIconChange, setSendIconChange, attachfileUpload, mediaToggle, mediaModalUrl,mediaModal, newGroupActive, newGroupToggle, addParticipantsToGroup, currentGroupHashArr, setgroupUsersList, groupUsersList}}>{props.children}</mainContext.Provider>
  )
}

export default MainState