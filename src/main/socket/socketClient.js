import socketIO from 'socket.io-client';
import moment from 'moment';
import config from '../../../config';
import store from '../store/store';
import { diff } from 'deep-diff';
import { addChatMessage } from '../store/actions/actions';

const mapState = (state) => ({
  character: state.game.possessedCharacter,
  allNotepads: state.notepad.notepads,
  isGM: state.account.isGM,
})

class SocketClient {
  constructor(options) {
    const socket = socketIO(options.socketAddress || config.server);
    this.socket = socket;
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.popperOpen = false;
    this.lastPopperUpdate = {};

    socket.on('connect', this.onConnect);
    socket.on('disconnect', this.onDisconnect);
    socket.on('chat', this.handleChatMessage);
    socket.on('roomInfo', (data) => {this.room = data});
    socket.on('roomMessage', this.onRoomMessage);
  }

  onRoomMessage = (data) => {
    // Filter out any self messaging
    if (data.sender === this.id) return;

    console.log('received room message', data);

    switch(data.type) {
      case 'join' : {
        this.popperJoined();
        return;
      }

      default: {}
    }
  }

  popperJoined = () => {
    this.popperOpen = true;

    const state = mapState(store.getState());
    this.updatePopper(state);
  }

  handleStoreUpdate = () => {
    if (this.popperOpen) {
      const state = mapState(store.getState());

      const changes = diff(this.lastPopperUpdate, state);

      if (changes) {
        this.updatePopper(state);
      }
    }
  }

  updatePopper = (state) => {
    this.lastPopperUpdate = state;
    this.socket.emit('room', {
      room: this.room,
      message: {
        sender: this.id,
        type: 'storeUpdate',
        data: state
      }
    });
  }

  disconnect = () => {
    this.socket.disconnect();
  }

  onConnect = () => {
    console.log('Socket connection established.');
    const idToken = store.getState().account.IDToken;
    this.socket.emit('register', {
      token: idToken,
      id: this.id,
    });

    store.subscribe(this.handleStoreUpdate);
  }

  onDisconnect = (reason) => {
    console.log(`Socket disconnected! ${reason}`);
  }

  handleChatMessage = (data) => {
    console.log('received a chat message', data);
    addChatMessage(data);
  }

  SendChatMessage = (message) => {
    this.socket.emit('chat', {
      message,
      sent: moment(),
    });
  }

  Roll = (roll, type) => {
    this.socket.emit('roll', {
      roll,
      type,
      sent: moment(),
    });
  }
}

export default SocketClient;
