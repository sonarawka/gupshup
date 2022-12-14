import React, { useContext, useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem } from '@mui/material';
import mainContext from '../../Context/mainContext';

const Header = () => {
    const context = useContext(mainContext)
    const { newchatToggle, profileToggle } = context
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const profile = localStorage.getItem("USERprofile")
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.clear()
        navigate('/')
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };

    const profileHandler=()=>{
        profileToggle()
        handleClose()
    }
    return (
        <div className="header">
            <div onClick={profileHandler} className="profile-pic-small"><img alt=""
                src={profile} />
            </div>

            <div className="menu-bar-icon">
                <svg className="menu-bar-status" version="1.1" id="ee51d023-7db6-4950-baf7-c34874b80976" x="0" y="0"
                    viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor"
                        d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z">
                    </path>
                </svg>

                <svg onClick={newchatToggle} viewBox="0 0 24 24" width="24" height="24" className="">
                    <path fill="currentColor"
                        d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z">
                    </path>
                </svg>

                <div onClick={handleClick} className="menu-icon-div"><i className="fa-solid fa-ellipsis-vertical "></i></div>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logoutHandler} >Logout</MenuItem>
                    <MenuItem onClick={profileHandler} >Profile</MenuItem>
                </Menu>
                

            </div>
        </div>
    )
}

export default Header