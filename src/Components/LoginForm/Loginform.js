import React, { useState } from 'react'
import './Loginform.css'
import icon from '../../favicon1.png'
import Loginnav from './Loginnav'
import Signupnav from './Signupnav'

const LoginForm = () => {
    const [active, setactive] = useState("login")
    const loginHandler=()=>{
      document.getElementById("loginnav-container").style.display="flex"
      document.getElementById("signupnav-container").style.display="none"
      setactive("login")
    }

    const signupHandler=()=>{
      document.getElementById("loginnav-container").style.display="none"
      document.getElementById("signupnav-container").style.display="flex"
      setactive("signup")
    }
  return (
    <div className='loginform-container'>
      <div className='loginform-header'>
        <img src={icon}/>
        <h2>Gupshup</h2>
      </div>
      <div className='loginform-tabnav'>
          <p onClick={loginHandler} className={active==="login"?"active":""}>Login</p>
          <p onClick={signupHandler} className={active==="signup"?"active":""}>Sign Up</p>
      </div>
      <Loginnav signupHandler={signupHandler}/>
      <Signupnav/>
    </div>
  )
}

export default LoginForm