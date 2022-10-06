import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { doc, setDoc } from "firebase/firestore";
import db from "../../Firebase";
import mainContext from '../../Context/mainContext';


const NewChatItem = (props) => {
  const context = useContext(mainContext)
  const {newchatToggle, getHash, currentHashId}=context
  const {id, name, profile, myemail, email}=props;
    

    
    const addConnection = ()=>{
      getHash(id, myemail)
      newchatToggle()
      setDoc(doc(db, "Users", myemail, "contact", email ), {uid:currentHashId, name:name, profile:profile})
      setDoc(doc(db, "Users", email, "contact", myemail ), {uid:currentHashId, name:localStorage.getItem("USERname"), profile:localStorage.getItem("USERprofile")})

    }
  
    
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