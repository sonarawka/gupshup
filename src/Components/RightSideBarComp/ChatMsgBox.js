import React, { useContext, useEffect, useState } from 'react'
import './ChatMsgBox.css'
import db from '../../Firebase'
import { addDoc, collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import mainContext from '../../Context/mainContext';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { IconButton } from '@mui/material';
import Draft, { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const ChatMsgBox = (props) => {
    const context = useContext(mainContext)
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    const { currentHashId, emojitoggle, setMessage, message } = context

    const inputHandler = (event) => {
        event.preventDefault()
        setMessage(event.target.value)
        
    }
    const formHandler = () => {
        // event.preventDefault()
        sendMsg(stateToHTML(editorState.getCurrentContent()))
        setEditorState(() => EditorState.createEmpty())
        // setMessage("")
    }

    const sendMsg = (msg) => {
        const msgRef = collection(db, "Chats", currentHashId, "messages");

        addDoc(msgRef, { name: props.USERname, message: msg, timestamp: Timestamp.fromDate(new Date()), read: false, recieved: false, media: null });
    }
   
    function keyBindingFn(e) {
        if (e.keyCode === 13 /* `Enter` key */) {
            if (e.nativeEvent.shiftKey) {
            } else {
              return 'submit-form'
            }
          }
      
        // This wasn't the delete key, so we return Draft's default command for this key
        return Draft.getDefaultKeyBinding(e)
      }

      function handleKeyCommand(command) {
        if (command === 'submit-form') {
            formHandler()
            // Do what you want to here, then tell Draft that we've taken care of this command
          return 'handled'
        }
      
        // This wasn't the 'delete-me' command, so we want Draft to handle it instead. 
        // We do this by telling Draft we haven't handled it. 
        return 'not-handled'
      }

    useEffect(() => {

    }, [])

    return (
        <div className="chat-detail-message-box">
            <IconButton onClick={emojitoggle}><TagFacesIcon sx={{ color: "rgb(117,132,142)" }} /></IconButton>
            <i className="fa-solid fa-paperclip"></i>
            <form className='chat-detail-message-form chat-detail-message-input-box' onSubmit={formHandler}>

                <Editor
                    keyBindingFn={keyBindingFn}
                    handleKeyCommand={handleKeyCommand}
                    // onChange={inputHandler}
                    // value={message}
                    editorState={editorState} 
                    onChange={setEditorState}
                    // className="chat-detail-message-input-box" type="text" placeholder="Type a message"
                />
                {/* <button type='submit'>Submit</button> */}
            </form>
            <i className="fa-solid fa-microphone"></i>
        </div>
    )
}

export default ChatMsgBox