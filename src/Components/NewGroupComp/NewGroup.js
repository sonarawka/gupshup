import React from 'react'
import NewGroupDetails from './NewGroup/NewGroupDetails'
import NewGroupHeader from './NewGroup/NewGroupHeader'
import './NewGroup.css'


const NewGroup = () => {
  return (
    <div className={`left-sidebar`}>
        <NewGroupHeader/>
        <NewGroupDetails/>
    </div>
  )
}

export default NewGroup