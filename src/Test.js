import React, { useState } from 'react';
import Draft, {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {stateToHTML} from 'draft-js-export-html';
import parse from 'html-react-parser';

const Test = () => {
    const [text, setText] = useState("")
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    const onBlurHandler=()=>{
        // console.log(stateToHTML(editorState.getCurrentContent()))
        setText(stateToHTML(editorState.getCurrentContent()))
    }
    function myKeyBindingFn(e) {

      if (e.keyCode === 13 /* `Enter` key */) {
        if (e.nativeEvent.shiftKey) {
          console.log("Alt + Enter")
        } else {
          console.log("Enter")
          return 'submit-form'
        }
      }
      return Draft.getDefaultKeyBinding(e);
    }

    function handleKeyCommand(command) {
      if (command === 'submit-form') {
          // formHandler()
          // Do what you want to here, then tell Draft that we've taken care of this command
        return 'handled'
      }
    
      // This wasn't the 'delete-me' command, so we want Draft to handle it instead. 
      // We do this by telling Draft we haven't handled it. 
      return 'not-handled'
    }
  return (
    <div>
    <div style={{width:"800px", height:"400px", border:"solid 2px red", color:"white"}}>
        <Editor handleKeyCommand={handleKeyCommand} keyBindingFn={myKeyBindingFn} onBlur={onBlurHandler} editorState={editorState} onChange={setEditorState} />
    </div>
    <div style={{color: "white"}}>
        {parse(text)}
    </div>
    </div>
  )
}

export default Test