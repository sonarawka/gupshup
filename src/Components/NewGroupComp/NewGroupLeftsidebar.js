import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'
import NewGroupContainer from './NewGroupContainer'
import NewGroupHeader from './NewGroupHeader'

const NewGroupLeftsidebar = () => {
    const context = useContext(mainContext)
    const { newChat, newGroupActive } = context

    
    return (
        <div className={`left-sidebar ${newChat ? "hidden" : ""} ${newGroupActive ? "" : "hidden"}`}>
            <NewGroupHeader/>
            <NewGroupContainer/>
        </div>
    )
}

export default NewGroupLeftsidebar