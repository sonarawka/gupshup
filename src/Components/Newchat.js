import React, { useContext } from 'react'
import mainContext from '../Context/mainContext'
import NewChatContainer from './NewChat/NewChatContainer'
import NewChatHeader from './NewChat/NewChatHeader'
import NewChatSearchBar from './NewChat/NewChatSearchBar'
import NewGroup from './NewChat/NewGroup'

const Newchat = () => {
  const context = useContext(mainContext)
  const { newChat, newGroupToggle, newGroupActive } = context

  return (
    <div className={`left-sidebar ${newChat?"":"hidden"} ${newGroupActive?"hidden":""}`}>
        <NewChatHeader />
        <NewChatSearchBar/>
        <NewGroup onClick={newGroupToggle}/>
        <NewChatContainer/>
    </div>
  )
}

export default Newchat