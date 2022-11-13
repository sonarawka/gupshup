import React, { useContext, useEffect, useState } from 'react'
import './ChatMsgBox.css'
import db, { storage } from '../../Firebase'
import { addDoc, collection, Timestamp } from "firebase/firestore";
import mainContext from '../../Context/mainContext';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { IconButton, Tooltip } from '@mui/material';
import Draft, { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import pdf from '../../Assets/pdf.png'

const ChatMsgBox = (props) => {
    const context = useContext(mainContext)
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    const { currentHashId, emojitoggle, lastSeen, attachment, sendIconChange, setSendIconChange, attachfileUpload, attachToggle, attachedFileType } = context

    // const inputHandler = (event) => {
    //     event.preventDefault()
    //     setMessage(event.target.value)
        
    // }
    const formHandler = () => {
        // event.preventDefault()
        sendMsg(stateToHTML(editorState.getCurrentContent()))
        setEditorState(() => EditorState.createEmpty())
        // setMessage("")
    }
    
    const sendMsg = (msg) => {
      const msgRef = collection(db, "Chats", currentHashId, "messages");

//img upload
if(attachfileUpload==null){
  addDoc(msgRef, { name: props.USERname, message: msg, timestamp: Timestamp.fromDate(new Date()), read: false, recieved: false, media: {} });

}
else{   

        const attachRef = ref(storage, `attachment/${currentHashId}/${attachfileUpload.name + v4()}`);
        
        uploadBytes(attachRef, attachfileUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            if(lastSeen==="Online")
            addDoc(msgRef, { name: props.USERname, message: msg, timestamp: Timestamp.fromDate(new Date()), read: false, recieved: true, media: {mtype:attachedFileType, url: attachedFileType.split("/")[1]==="pdf"?pdf:url} });
            else
            addDoc(msgRef, { name: props.USERname, message: msg, timestamp: Timestamp.fromDate(new Date()), read: false, recieved: false, media: {mtype:attachedFileType, url: attachedFileType.split("/")[1]==="pdf"?pdf:url} });
           
          });
        })

        attachToggle() 
      }
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

        if(stateToHTML(editorState.getCurrentContent())!=='<p><br></p>'){
          setSendIconChange(true)
        }
        else{
          setSendIconChange(false)
        }

      }, [editorState])
      

    return (
        <div className="chat-detail-message-box">
            <IconButton onClick={emojitoggle}><TagFacesIcon sx={{ color: "rgb(117,132,142)" }} /></IconButton>
            <label htmlFor="attachInput">
            <input style={{display: "none"}} onChange={attachment} type="file" id='attachInput'/> 

            <Tooltip title='Attach'>
              <IconButton component='span'>
              <AttachmentIcon sx={{ color: "rgb(117,132,142)", transform: "rotate(135deg) scaleX(-1)" }} />
              </IconButton>
            </Tooltip>

            </label>


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
            {sendIconChange?<IconButton onClick={formHandler}><SendIcon sx={{ color: "rgb(117,132,142)" }}/></IconButton>:<IconButton ><MicIcon sx={{ color: "rgb(117,132,142)" }}/></IconButton>}
        </div>
    )
}

export default ChatMsgBox