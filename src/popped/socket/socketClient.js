import socketIO from 'socket.io-client';
import moment from 'moment';
import store from '../store/store';
import config from '../../../config';

import { updateStore } from '../store/actions';

function getPath() { return store.getState().pathname };

class SocketClient {
  constructor() {
    const socket = socketIO(config.server);
    this.socket = socket;
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    socket.on('connect', this.onConnect);
    socket.on('disconnect', this.onDisconnect);
    socket.on('roomInfo', this.onRoomConnect);
    socket.on('roomMessage', this.onRoomMessage);
  }

  // Registered event handlers
  onConnect = () => {
    console.log('Socket connection established.');

    this.socket.emit('register', {
      id: this.id
    })

    // We use the unload event rather than beforeunload because it doesn't pop the "Your changes may be lost" dialog.
    window.addEventListener('unload', (event) => {
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    
      this.disconnect();
    });
  }

  onDisconnect = (reason) => {
    // TODO: something meaningful here
    console.log(`Socket disconnected! ${reason}`);
  }

  onRoomConnect = (data) => {
    this.room = data;

    this.socket.emit('room', {
      room: data,
      message: {
        sender: this.id,
        type: 'connect',
        data: {
          id: this.id,
          pathname: getPath(),
        },
      }
    })
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
    console.log('handling store update', data)
    updateStore(data);
  }

  // Public
  disconnect = () => {
    this.socket.emit('room', {
      room: this.room,
      message: {
        sender: this.id,
        type: 'disconnect',
        data: {
          id: this.id,
          pathname: getPath(),
        },
      }
    })

    this.socket.disconnect();
  }

  popIn = () => {
    this.socket.emit('room', {
      room: this.room,
      message: {
        sender: this.id,
        type: 'popIn',
        data: {
          id: this.id,
          pathname: getPath(),
        },
      }
    })

    window.close();
  }
}

export default SocketClient;
