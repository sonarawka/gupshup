import { Avatar } from '@mui/material'
import React from 'react'

const NewGroupDetails = () => {
  return (
    <div className='profile-detail-main'>
      <div className='profileBigAvatar-div'>
        <Avatar id='profileBigAvatar' src={localStorage.getItem("USERprofile")} sx={{ width: "200px", height: "200px" }} />
        <div className='avtar-hover'></div>
      </div>
      <p className='profile-detail-label'>Your name</p>
      <p className='profile-detail-text'>{localStorage.getItem("USERname")}</p>
      <p className='profile-detail-description'>This is not your username or pin. This name will be visible to your Gupshup contacts.</p>
      <p className='profile-detail-label'>About</p>
      <p className='profile-detail-text'>Busy</p>
    </div>
  )
}

export default NewGroupDetails