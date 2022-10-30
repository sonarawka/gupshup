import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'
import NewGroupContainer from './NewGroupContainer'
import NewGroupHeader from './NewGroupHeader'
import './NewGroupLeftsidebar.css'
import NewGroupAddContact from './NewGroupAddContact'

const NewGroupLeftsidebar = () => {
    const context = useContext(mainContext)
    const { newChat, newGroupActive } = context

    return (
        <div className={`left-sidebar ${newChat ? "hidden" : ""} ${newGroupActive ? "" : "hidden"}`}>
            <NewGroupHeader />
            <NewGroupAddContact />
            <NewGroupContainer />

        </div>
    )
}

export default NewGroupLeftsidebar