import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewGroupHeader = () => {
const context = useContext(mainContext)
  const { newGroupToggle} = context
  return (
    <div className="newchat-header">
      <div>
      <IconButton onClick={newGroupToggle} sx={{color:"white"}}>
        <ArrowBackIcon />
      </IconButton>
      <p>Add group participants</p>
      </div>
    </div>
  )
}

export default NewGroupHeader