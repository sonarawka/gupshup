import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import mainContext from '../../Context/mainContext';
import './AttachmentFile.css'
const AttachmentFile = () => {
    const context = useContext(mainContext)
    const {attachfilesrc, attachToggle} = context
  return (
    <div className='attachment-main-area'>
        <div className='attachment-header'><CloseIcon onClick={attachToggle}/></div>
        <div className='attachment-main'><img width="250px" src={attachfilesrc}/></div>

    </div>
  )
}

export default AttachmentFile