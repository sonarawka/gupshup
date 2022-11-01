import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import mainContext from '../../../Context/mainContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewGroupHeader = () => {
  const context = useContext(mainContext)
  const { newGroupDetailToggle } = context
  return (
    <div className="profile-header">
      <div>
      <IconButton onClick={newGroupDetailToggle} sx={{color:"white"}}>
        <ArrowBackIcon />
      </IconButton>
      <p>New Group</p>
      </div>
    </div>
  )
}

export default NewGroupHeader