import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import './NewChatHeader.css'
const NewChatHeader = ({toggle}) => {
  return (
    <div className="newchat-header">
      <IconButton onClick={toggle} sx={{color:"white"}}>
        <ArrowBackIcon />
      </IconButton>
      <p>New Chat</p>
    </div>
  )
}

export default NewChatHeader