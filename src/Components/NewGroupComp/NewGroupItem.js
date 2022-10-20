import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'

const NewGroupItem = (props) => {
    const {profile, name} = props
    const context = useContext(mainContext)
    const { addParticipantsToGroup } = context

  return (
    <div onClick={addParticipantsToGroup} className="chat-item">
            <div className="chat-item-profile-pic"><img alt=""
                src={profile} />
            </div>
            <div className="chat-item-detail">
                <div className="chat-item-text">
                    <h4 className="chat-item-name">{name}</h4>
                  
                </div>
                
            </div>
       
    </div>
  )
}

export default NewGroupItem