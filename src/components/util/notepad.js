import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import Container from '@material-ui/core/Container';
import ms from 'ms';

import { withStyles } from '@material-ui/styles';
import styles from '../style/styles';

import saveNotepad from '../../requests/utility/saveNotepad';
// import socket from '../../socket/socketClient';


class Notepad extends Component {
  constructor(props) {
    super(props);

    this.quillRef = null;      // Quill instance
    this.reactQuillRef = React.createRef(); // ReactQuill component

    this.state = { text: props.pad.Text };
    this.timer = null;
  }

  componentDidMount() {
    this.attachQuillRefs();
    this.timer = setInterval(this.save, ms('15s'));
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (!this.reactQuillRef.current || typeof this.reactQuillRef.current.getEditor !== 'function' ) return;
    
    // So far we haven't gotten here yet. HMMMMMM
    this.quillRef = this.reactQuillRef.current.getEditor();
  }

  handleChange = (value) => {
    this.setState({ text: value });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.active && !this.props.active) {
      this.save();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.save();
  }

  save = async () => {
    if (this.state.text !== this.props.pad.Text) {
      console.log('saving notepad', this.props.pad);
      const notepad = this.props.pad;
      notepad.Text = this.state.text;

      await saveNotepad(notepad)
    }
  }

  render() {
    if (!this.props.active) return null;
    const { classes } = this.props;

    return (
      <Container
        className={classes.notepad}
      >
        <ReactQuill
          ref={this.reactQuillRef}
          value={this.state.text}
          onChange={this.handleChange}

        />
      </Container>

    );
  }
}

Notepad.propTypes = {
  active: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notepad);
