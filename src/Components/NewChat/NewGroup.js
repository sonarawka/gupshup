import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';
import './NewGroup.css';
import mainContext from '../../Context/mainContext';

const NewGroup = () => {
    const context = useContext(mainContext)
  const { newGroupToggle } = context
    return (
        <div onClick={newGroupToggle} className="newGroup-Icon-main">
            <div className='newGroup-Icon'><GroupIcon /></div>

            <div className="newGroup-Icon-detail">
                <div className="newGroup-Icon-text">
                    <h4 className="newGroup-Icon-name">New Group</h4>

                </div>

            </div>

        </div>
    )
}

export default NewGroup