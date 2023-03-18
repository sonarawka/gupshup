import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from '@mui/icons-material/Edit';
import { doc, getDoc, setDoc } from "firebase/firestore";
import db, {storage} from "../../Firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
const Signupnav = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({ name: "", email: "", phone: "", bio: "", password: "", confirmpass: "", lastseen:new Date() });
  const [anchorEl, setAnchorEl] = useState(null);
  const [AvatarSrc, setAvatarSrc] = useState("")
  const [imageUpload, setImageUpload] = useState(null);
  const open = Boolean(anchorEl);

  
  const inputHandler = (event) => {
    setuser({ ...user, [event.target.name]: event.target.value })

  }

  const submitHandler=(event)=>{
    event.preventDefault()
    if (imageUpload == null) {alert("Please upload profile image") 
    return;}

    if(user.password!==user.confirmpass){
      alert('passwords do not match')
      return;
    }
    
    getDoc(doc(db, "Users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        alert('A user with this email already exist')
      } else {
       
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setDoc(doc(db, "Users",user.email),{email:user.email,about:user.bio, fullName:user.name, phoneNo:user.phone,password:user.password,profile:url});
            localStorage.setItem("email", user.email);
            localStorage.setItem("USERname", user.name);
            localStorage.setItem("USERprofile", url);
           
          });
        });
        navigate("/home");
      }
    })
  }

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
  
  
  useEffect(() => {
    if(localStorage.getItem("SignupEmail")){
      setuser({...user, email:localStorage.getItem("SignupEmail") , name: localStorage.getItem("SignupName")})
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("SignupEmail")])
  
  useEffect(() => {
    localStorage.setItem("SignupEmail", "");
    localStorage.setItem("SignupName", "");
  }, [])
         

  return (
    <div id='signupnav-container'>
      <div className='signup-profile-container'>
        <Avatar id='profileAvatar' src={AvatarSrc} sx={{ width: "70px", height: "70px"}} />
        <IconButton sx={{ position: 'absolute', right: '-20px', bottom: '-7px', color: 'white'}}
          onClick={handleClick}
        >
          <EditIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
        >
          <MenuItem><input style={{ display: 'none' }} onChange={imagePicker} type='file' id='profileImageUpload' /> <label htmlFor='profileImageUpload'>Choose Image</label> </MenuItem>
        </Menu>
      </div>

      <form className='signupnav-container-form' onSubmit={submitHandler}>
        <input placeholder='Full Name' type="text" name="name" value={user.name} onChange={inputHandler} />
        <input placeholder='Email' type="email" name="email" value={user.email} onChange={inputHandler} />
        <input placeholder='Phone no.' type="text" name="phone" value={user.phone} onChange={inputHandler} />
        <input placeholder='Bio' type="text" name="bio" value={user.bio} onChange={inputHandler} />
        <input placeholder='Password' type="password" name="password" value={user.password} onChange={inputHandler} />
        <input placeholder='Confirm Password' type="password" name="confirmpass" value={user.confirmpass} onChange={inputHandler} />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signupnav