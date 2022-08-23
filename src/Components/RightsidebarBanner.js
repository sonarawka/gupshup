import React, { useEffect } from 'react'
import './Rightsidebar.css'
import bg from '../Assets/demo-bg-image.png'
import { useNavigate } from 'react-router-dom'
const RightsidebarBanner = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem("email")){
            navigate('/')
          }
    }, [])
    
    return (
        <div className="right-sidebar">
            <div className="banner-intro">
                <div className="gupshup-demo-image">
                    <img src={bg} alt="" />
                </div>

                <h1 className="gupshup-name">Gupshup Web</h1>
                <div className="about-app">
                    <p className="about-app-description">Now send and receive messages without keeping your phone
                        online.
                        <br /> Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                    </p>

                    <div className="about-app-details">
                        <p><i className="fa-solid fa-laptop"></i></p>
                        <p> &nbsp; Make calls from desktop with WhatsApp for Windows. &nbsp;</p> <a
                            className="app-info-link" href="https://www.whatsapp.com/download" target="_blank">Get it
                            here</a>.
                    </div>
                </div>
                <footer className="about-app-footer">

                    <i className="fa-solid fa-lock"></i> End-to-end encrypted

                </footer>
            </div>
        </div>
    )
}

export default RightsidebarBanner