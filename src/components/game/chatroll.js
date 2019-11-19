'use strict';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';

import Button from '../primitives/button';

import ChatList from './chat/chatList';
import ErrorComponent from '../util/error';

const supportedCommands = ['me', 'roll']

class ChatRoll extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      }
    }

    sendChat=(message) => {
      const lowered = message.toLowerCase();
      if (lowered[0] === '/') {
        let command = lowered.slice(1, lowered.indexOf(' '));

        if (!supportedCommands.includes(command)) {
          this.setState({error: `Command ${command} not supported.`})
          return;
        }
      }

      this.props.onSendChat(lowered);
    }

    onKeyDown=(e) => {
      if(e.keyCode == 13 && e.shiftKey == false) {
        e.preventDefault();

        const message = e.target.value;

        e.target.value = '';
        this.sendChat(message);
      }
    }

    onSubmit=(e) => {
      e.preventDefault();

      const message = e.target.elements.chatMessage.value;

      e.target.elements.chatMessage.value = '';

      this.sendChat(message);
    }

    render() {
      return (
        <Container component='div' className='chatroll-root'>
          <ChatList messages={this.props.messages || []}/>
          <form ref={el => this.myFormRef = el} onSubmit={this.onSubmit} className='chatInput'>
          <hr />
          <div className='chatInputGrid'>
            <textarea 
              type='text'
              name='chatMessage'
              onKeyDown={this.onKeyDown}
            />
            <Button>Send</Button>
          </div>
         
        </form>
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

const mapStateToProps= (state) => {
  return {
    messages: state.chat.chatMessages
  }
}

export default connect(mapStateToProps)(ChatRoll);