import React from 'react'
import NewChatContainer from './NewChat/NewChatContainer'
import NewChatHeader from './NewChat/NewChatHeader'
import NewChatSearchBar from './NewChat/NewChatSearchBar'

const Newchat = ({toggle, newChat}) => {
  return (
    <div className={`left-sidebar ${newChat?"":"hidden"}`}>
        <NewChatHeader toggle={toggle}/>
        <NewChatSearchBar/>
        <NewChatContainer toggle={toggle}/>
    </div>
  )
}

export default Newchat