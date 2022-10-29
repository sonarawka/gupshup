import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'
import './NewGroupLeftsidebar.css'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material'

const NewGroupAddContact = () => {
    const context = useContext(mainContext)
    const { currentGroupHashArr } = context
    return (
        <div className='addContact-main'>
            {
                currentGroupHashArr.map((e) => {
                    return (
                        <div key={e.hash} className="newGroupContact-main">
                            <img className="newGroupContactProfileImg" src={e.profile} />
                            <span className="newGroupContactName" >{e.name}</span>
                            <IconButton> <CloseIcon className="newGroupContactCloseIcon" sx={{ fontSize: "14px" }} /></IconButton>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default NewGroupAddContact