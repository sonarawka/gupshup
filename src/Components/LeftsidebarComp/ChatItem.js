import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './ChatItem.css'
import MD5 from 'crypto-js/md5';
import mainContext from '../../Context/mainContext';

const ChatItem = (props) => {
    const {id, name, profile, myEmail}=props;
    const location = useLocation()
    const context = useContext(mainContext)
    const {setcurrentHashId}=context
    const [concatEmail, setConcatEmail] = useState("")
    const uid = "/home/chats/" + id

    const hashcalc = ()=>{
        return MD5(concatEmail).toString();
       }

       const addConnection = ()=>{
        setcurrentHashId(hashcalc())
  
      }

      useEffect(() => {
        // console.log(localStorage.getItem("email"))
        if(myEmail.charAt(0)>id.charAt(0)){
          setConcatEmail(id+myEmail)
        }
        else{
          setConcatEmail(myEmail+id)
        }
        
      }, [id, myEmail])
    return (
        <Link onClick={addConnection} to={`/home/chats/${id}`} state={{name:name, profile:profile}} className={`chat-item ${uid===location.pathname?"active":""}`}>
            <div className="chat-item-profile-pic"><img alt=""
                src={profile} />
            </div>
            <div className="chat-item-detail">
                <div className="chat-item-text">
                    <h4 className="chat-item-name">{name}</h4>
                    <p className="chat-item-timestamp">9:03 am</p>
                </div>
                <div className="chat-item-text">
                    <p className="chat-item-lastmsg">Hi There!</p>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>
        </Link>
    )
}

export default ChatItem