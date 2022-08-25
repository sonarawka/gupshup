import React, { useContext } from 'react'
import mainContext from '../Context/mainContext'
import './Profile.css'
import ProfileDetails from './Profile/ProfileDetails'
import ProfileHeader from './Profile/ProfileHeader'

const Profile = () => {
  const context = useContext(mainContext)
  const { profiledetail } = context
  return (
    <div className={`left-sidebar ${profiledetail?"":"hidden"}`}>
        <ProfileHeader/>
        <ProfileDetails/>
    </div>
  )
}

export default Profile