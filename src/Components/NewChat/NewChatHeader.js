import React, { useContext } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import './NewChatHeader.css'
import mainContext from '../../Context/mainContext';
const NewChatHeader = () => {
  const context = useContext(mainContext)
  const { newchatToggle} = context

  return (
    <div className="newchat-header">
      <div>
      <IconButton onClick={newchatToggle} sx={{color:"white"}}>
        <ArrowBackIcon />
      </IconButton>
      <p>New Chats</p>
      </div>
    </div>
  )
}

export default NewChatHeader