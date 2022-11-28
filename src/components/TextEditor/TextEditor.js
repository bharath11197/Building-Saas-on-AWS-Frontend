import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html';

function TextEditor({ setTextEditor }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    let change = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setEditorState(editorState)
    setTextEditor(change)
  }

  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </>
  )
}

export default TextEditor;