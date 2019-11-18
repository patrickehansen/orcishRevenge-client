import React, { Component } from 'react';
import {connect} from 'react-redux';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {diff} from 'deep-object-diff';
import saveNotepad from '../../../requests/utility/saveNotepad';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class WordEditor extends Component {
  constructor(props){
    super(props);

    if (typeof props.Text === 'object' && Object.keys(props.Text).length < 1) {

    }

    if (props.notepad) {
      let needNew = !props.notepad.Text || typeof props.notepad.Text !== 'object' || Object.keys(props.notepad.Text) < 1;

      
      let editorState;
      if (needNew) {
        editorState = EditorState.createEmpty();

        saveNotepad(props.NotepadID, convertToRaw(editorState.getCurrentContent()));
      }else{
        console.log('uh hi?', props.notepad, props.notepad.Text)
        //const converted = convertFromRaw(props.notepad.Text);

        //console.log(converted);
        editorState = EditorState.createEmpty()
      }

      this.state = {
        editorState,
        fromRemote: true,
      }
    }else{
      this.state = {
        editorState: EditorState.createEmpty(),
        fromRemote: false,
      }
    }    
  }

  onEditorStateChange = (editorState) => {
    
    if (this.props.NotepadID) {
      const existingContent = this.state.editorState.getCurrentContent();
      const nextContent = editorState.getCurrentContent();


      const determined = diff(existingContent, nextContent);

      console.log('We did a diff', existingContent, nextContent);
    }

    this.setState({
      editorState,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.fromRemote && this.props.notepad) {
      console.log('cdu', this.props.notepad);

      let needNew = !this.props.notepad.Text || typeof this.props.notepad.Text !== 'object' || Object.keys(this.props.notepad.Text) < 1;

      let editorState;
      if (needNew) {
        editorState = EditorState.createEmpty();

        saveNotepad(this.props.NotepadID, convertToRaw(editorState.getCurrentContent()));
      }else{
        editorState = EditorState.createWithContent(convertFromRaw(this.props.notepad.Text));
      }

      this.setState({
        editorState,
        fromRemote: true,
      })
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="rdw-storybook-root">
        <Editor
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}

        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('mstp we', state.notepad, ownProps.NotepadID);
  return {
    notepad: state.notepad.notepads[ownProps.NotepadID]
  }
}

export default connect(mapStateToProps)(WordEditor);