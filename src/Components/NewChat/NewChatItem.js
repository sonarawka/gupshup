import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../Firebase";
import MD5 from 'crypto-js/md5';
import mainContext from '../../Context/mainContext';

const NewChatItem = (props) => {
  const context = useContext(mainContext)
  const {setcurrentHashId}=context
  const {id, name, profile, myemail, email, toggle}=props;
    const [concatEmail, setConcatEmail] = useState("")

    const hashcalc = ()=>{
     return MD5(concatEmail).toString();
    }
    const addConnection = ()=>{
      setcurrentHashId(hashcalc())
      toggle()
      setDoc(doc(db, "Users", myemail, "contact", email ), {uid:hashcalc(), name:name, profile:profile})
      setDoc(doc(db, "Users", email, "contact", myemail ), {uid:hashcalc(), name:localStorage.getItem("USERname"), profile:localStorage.getItem("USERprofile")})

    }
   
    useEffect(() => {
      if(myemail.charAt(0)>email.charAt(0)){
        setConcatEmail(email+myemail)
      }
      else{
        setConcatEmail(myemail+email)
      }
      
    }, [email, myemail])
    
  return (
    <Link onClick={addConnection} to={`/home/chats/${id}`} state={{name:name, profile:profile}} className="chat-item">
            <div className="chat-item-profile-pic"><img alt=""
                src={profile} />
            </div>
            <div className="chat-item-detail">
                <div className="chat-item-text">
                    <h4 className="chat-item-name">{name}</h4>
                  
                </div>
                
            </div>
        </Link>
  )
}

export default NewChatItem