import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileHeader = () => {
  const context = useContext(mainContext)
  const { profileToggle } = context
  return (
    <div className="profile-header">
      <div>
      <IconButton onClick={profileToggle} sx={{color:"white"}}>
        <ArrowBackIcon />
      </IconButton>
      <p>Profile</p>
      </div>
    </div>
  )
}

export default ProfileHeader