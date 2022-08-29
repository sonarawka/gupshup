import React, { useState } from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {stateToHTML} from 'draft-js-export-html';
import parse from 'html-react-parser';

const Test = () => {
    const [text, setText] = useState("")
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    const onBlurHandler=()=>{
        console.log(stateToHTML(editorState.getCurrentContent()))
        setText(stateToHTML(editorState.getCurrentContent()))
    }
  return (
    <div>
    <div style={{width:"800px", height:"400px", border:"solid 2px red", color:"white"}}>
        <Editor onBlur={onBlurHandler} editorState={editorState} onChange={setEditorState} />
    </div>
    <div style={{color: "white"}}>
        {parse(text)}
    </div>
    </div>
  )
}

export default Test