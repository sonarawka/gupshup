import React from 'react'
import './NewChatSearchBar.css'

const NewChatSearchBar = () => {
  return (
    <div className="newchat-searchbar">
            <form>
                <input className="newchat-searchbar-inputbox" placeholder="Search or start new chat" />

            </form>
            
        </div>
  )
}

export default NewChatSearchBar