import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckIcon from '@mui/icons-material/Check';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import db, { storage } from '../../../Firebase';
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { async } from '@firebase/util';
import mainContext from '../../../Context/mainContext';
const NewGroupDetails = () => {
  const context = useContext(mainContext)
  const {addGroupToggle, groupContactList} = context
  const [hrfocus, setHrfocus] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [anchorEl, setAnchorEl] = useState(null);
  const [AvatarSrc, setAvatarSrc] = useState("")
  const [imageUpload, setImageUpload] = useState(null);
  const [groupId, setGroupId] = useState("")
  const [profileUrl, setProfileUrl] = useState("")
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const imagePicker=(event)=>{
      setAvatarSrc(URL.createObjectURL(event.target.files[0]));
      setImageUpload(event.target.files[0]);
      handleClose()
      
  }

  const focusHandler = () => {
    setHrfocus(true)
  }
  const blurHandler = () => {
    setHrfocus(false)
  }

  const inputHandler =(event)=>{
    setGroupName(event.target.value)
  }

  const groupHandler = async()=>{
     const imageRef = ref(storage, `groupProfile/${imageUpload.name + v4()}`);
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            setProfileUrl(url)
            const docRef =  await addDoc(collection(db, "Groups"), {
              groupName: groupName,
              lastMsg: "",
              links: "",
              profile: url
              
            });
            setGroupId(docRef.id)
          });
        });    
  }

  const addParticipantsToGroupdb= ()=>{
    groupContactList.forEach((item)=>{
    const groupRef = collection(db, "Groups", groupId, "members")
    
      addDoc(groupRef, {
        fullName: item.data.fullName,
        profile: item.data.profile,
        email: item.id
      })
    })
  }

  useEffect(() => {
    if(groupId!=""){
      const userRef = setDoc(doc(db, "Users", localStorage.getItem("email"), "Groups", groupId), {
        groupName: groupName,
            profile: profileUrl
      })
      addGroupToggle()
      addParticipantsToGroupdb()

    }
  }, [groupId])
  

  return (
    <div className='newGroup-profile-detail-main'>
      <div className='newGroup-profileBigAvatar-div'>
        <Avatar src={AvatarSrc} onClick={handleClick} id='newGroup-profileBigAvatar' sx={{ width: "200px", height: "200px", backgroundColor: "rgb(45,56,62)", position:"relative" }}>
          <GroupIcon sx={{ width: "150px", height: "150px", color: "#414b52", position:"relative", left:"35px" }}/>
        
          <div className='add-group-image'>
              <CameraAltIcon/>
              <p>Add Group Icon </p>
            </div>
        </Avatar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
        >
          <MenuItem><input style={{ display: 'none' }} onChange={imagePicker} type='file' id='profileImageUpload' /> <label htmlFor='profileImageUpload'>Choose Image</label> </MenuItem>
        </Menu>

      </div>
      <div>
        <input onChange={inputHandler} onFocus={focusHandler} onBlur={blurHandler} className='newGroup-group-name' placeholder='Group Subject' />
        <hr className={`${hrfocus === false ? 'newGroup-underline' : 'onfocus'}`} />
      </div>
      <div className='newGroup-disappear-msg'>
        <p>Disappearing Messages</p>
        <p>Off</p>
      </div>
      <div className='forwardArrow'>
      {groupName.length!=0 ? <IconButton onClick={groupHandler} sx={{backgroundColor: "rgb(0,168,132)", height:"46px", width:"46px", ':hover':{backgroundColor:"rgb(0,168,132)"}}}className='forwardArrow-Btn'><CheckIcon sx={{color:"white", fontSize:"25px", borderRadius:"50%"}}/></IconButton> : ""}
      </div>

    </div>
  )
}

export default NewGroupDetails