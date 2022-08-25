import React, { useContext } from 'react'
import mainContext from '../Context/mainContext'
import NewChatContainer from './NewChat/NewChatContainer'
import NewChatHeader from './NewChat/NewChatHeader'
import NewChatSearchBar from './NewChat/NewChatSearchBar'

const Newchat = () => {
  const context = useContext(mainContext)
  const { newChat } = context
  return (
    <div className={`left-sidebar ${newChat?"":"hidden"}`}>
        <NewChatHeader/>
        <NewChatSearchBar/>
        <NewChatContainer/>
    </div>
  )
}

export default Newchat