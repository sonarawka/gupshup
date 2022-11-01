import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'
import NewGroupDetails from './NewGroup/NewGroupDetails'
import NewGroupHeader from './NewGroup/NewGroupHeader'
import './NewGroup.css'


const NewGroup = () => {
  const context = useContext(mainContext)
  const { newGroupDetails } = context
  return (
    <div className={`left-sidebar`}>
        <NewGroupHeader/>
        <NewGroupDetails/>
    </div>
  )
}

export default NewGroup