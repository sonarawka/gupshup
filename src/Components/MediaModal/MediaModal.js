import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'
import CloseIcon from '@mui/icons-material/Close';
import './MediaModal.css'
import { IconButton } from '@mui/material';
const MediaModal = () => {
    const context = useContext(mainContext)
    const {  mediaToggle, mediaModalUrl } = context
  return (
    
    <div className='modal-main-area' onClick={mediaToggle}>
        <div className='modal-header'><IconButton onClick={mediaToggle} ><CloseIcon sx={{ color: "rgb(117,132,142)" }}/></IconButton></div>
        <div className='modal-main'><img style={{height:'88vh'}} src={mediaModalUrl} alt=""/></div>
    </div>
  )
}

export default MediaModal