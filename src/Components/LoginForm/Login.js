import React from 'react'
import RightsidebarBanner from '../RightsidebarBanner'
import Loginform from './Loginform'
const Login = () => {
  return (
    <div className="main-container">
        <Loginform/>
        <RightsidebarBanner/>  
    </div>
  )
}

export default Login