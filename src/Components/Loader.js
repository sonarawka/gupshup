import React, { useEffect } from 'react'
import './Loader.css'
import logo1 from '../Assets/favicon1.png'
import logo3 from '../Assets/logo3.png'
import logo4 from '../Assets/logo4.png'
import { useNavigate } from 'react-router-dom';

const Loader = () => {
    const navigate = useNavigate();

   useEffect(() => {
     const timeout=setTimeout(()=>{
        if (!localStorage.getItem("email")) {
            navigate("/");
          } else{
        navigate("/home");
          }

     }, 2000);
   
     return () => {
        clearTimeout(timeout);
     }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
    return (
        <div className="loader-main">
            <div className="loader-img-container">
                <img className="stage1 stage2" src={logo1} />
                <img className="stage3 " src={logo3} />
                <img className="stage4" src={logo4} />
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar-bg"></div>
                <div className="progress-bar"></div>
            </div>
            <p className="loader-text">Gupshup</p>
            <p className="loader-subtext">End-to-end encrypted</p>
        </div>

    )
}

export default Loader