import socketIO from 'socket.io-client';
import moment from 'moment';
import store from '../store/store';
import config from '../../../config';

import { updateStore } from '../store/actions';

class SocketClient {
  constructor(options) {
    const socket = socketIO(config.server);
    this.socket = socket;
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    socket.on('connect', this.onConnect);
    socket.on('roomInfo', (data) => {this.room = data});

    socket.on('roomMessage', this.onRoomMessage);
  }

  onRoomMessage = (data) => {
    // Filter out any self messaging
    if (data.sender === this.id) return;

    switch(data.type) {
      case 'storeUpdate' : {
        this.handleStoreUpdate(data.data);
        return;
      }
      default: {
        console.log('received room message', data);
      }
    }
  }

  handleStoreUpdate = (data) => {
    console.log('store update', data);

    updateStore(data);
  }

  disconnect = () => {
    this.socket.disconnect();
  }

  onConnect = () => {
    console.log('Socket connection established.');

    this.socket.emit('register', {id:this.id})
  }

  onDisconnect = (reason) => {
    console.log(`Socket disconnected! ${reason}`);
  }
}

export default SocketClient;
