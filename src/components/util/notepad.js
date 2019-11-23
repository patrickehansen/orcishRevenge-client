import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import Container from '@material-ui/core/Container';

import {withStyles} from '@material-ui/styles';
import {styles} from '../style/styles';
import socket from '../../socket/socketClient';

class Notepad extends Component {
  constructor(props) {
    super(props) 

    this.state = {text: ''};
  }  

  handleChange = (value) => {
    this.setState({ text: value })
  }

  render() {
    if (!this.props.active) return null;

    const {classes} = this.props;

    return (
      <Container 
        className={classes.notepad}
      >
        <ReactQuill 
          value={this.state.text}
          onChange={this.handleChange} 

        />
      </Container>
      
    )
  }
}

export default withStyles(styles)(Notepad);
