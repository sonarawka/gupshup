import React from 'react'
import './Notification.css'

const Notificationbar = () => {
    return (
        <div className="notificationbar">
            <div className="notification-icon"><i className="fa-solid fa-bell-slash"></i></div>
            <div className="notification-label">
                <p className="notification-header">Get notified of new messages</p>
                <p className="notification-text">Turn on desktop notifications <i
                    className="fa-solid fa-chevron-right"></i></p>
            </div>
        </div>
    )
}

export default Notificationbar