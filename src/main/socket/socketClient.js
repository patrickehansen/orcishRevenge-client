import socketIO from 'socket.io-client';
import moment from 'moment';
import config from '../../../config';
import store from '../store/store';
import { diff } from 'deep-diff';
import { addChatMessage, setPopped } from '../store/actions/actions';

// Equivalent to mapStateToProps to pull data off the store
const mapState = (state) => ({
  character: state.game.possessedCharacter,
  allNotepads: state.notepad.notepads,
  isGM: state.account.isGM,
})

// This provides the client for interacting with the socket server for the bulk of communications
class SocketClient {
  constructor(options) {
    // Initialize the socket connection
    this.socket = socketIO(options.socketAddress || config.server);

    // Generate a random id -> this helps prevent self-dealing later on
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Keep track of any poppers that we add so that we can know when to update them
    this.poppers = [];

    // Keep track of the last store update to the poppers so we don't use unnecessary traffic
    this.lastPopperUpdate = {};

    // Assign event handlers
    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
    this.socket.on('chat', this.onChat);
    this.socket.on('roomInfo', (data) => {this.room = data});
    this.socket.on('roomMessage', this.onRoomMessage);
  }

  // Main event handlers
  onConnect = () => {
    console.log('Socket connection established.');
    const idToken = store.getState().account.IDToken;

    // Register with our id and token, then subscribe to the store
    this.socket.emit('register', {
      token: idToken,
      id: this.id,
    });

    store.subscribe(this.handleStoreUpdate);
  }

  onDisconnect = (reason) => {
    // Do something here?
    console.log(`Socket disconnected! ${reason}`);
  }

  onChat = (data) => {
    console.log('received a chat message', data);
    // Add the chat message to the store
    addChatMessage(data);
  }

  onRoomMessage = (message) => {
    // Filter out any self messaging
    if (message.sender === this.id) return;

    console.log('received room message', message);

    switch(message.type) {
      case 'join' : {
        return this.onPopperJoined(message.data);
      }
      case 'connect' : {
        return this.onPopperConnect(message.data);
      }
      case 'disconnect' : {
        return this.onPopperDisconnect(message.data);
      }
      case 'popIn' : {
        return this.onPopIn(message.data);
      }

      default: {}
    }
  }

  // Child event handlers
  onPopperJoined = (remoteID) => {
    // No self dealing
    if (remoteID === this.id) return;

    // This function happens at the earliest possible time and will fire before onPopperConnect.
    this.poppers.push(remoteID);
    
    // Map the state and update the poppers
    const state = mapState(store.getState());
    this.updatePopper(state);
  }

  onPopperConnect = (data) => {
    // TODO: Something needs to be done here as this is the first time I know *which* popper it is.
    console.log('popper connected', data)
  }

  onPopperDisconnect = (data) => {
    this.poppers = this.poppers.filter(v => v !== data.id);

    switch (data.pathname) {
      case '/character': {
        console.log('character popper disconnected');

      }
      case '/gm' :{}
      case '/groupNotes' : {}
      case '/groupInventory' : {}
      default: {}
    }

    // Handle the new popped state of the component the popper contained
    const currentPop = store.getState().game.popped[data.pathname.slice(1)];

    // Disconnect fires whether we popped in or not. If we popped in, we don't want to close the modal
    if (currentPop === 'popped') {
      setPopped(data.pathname.slice(1), false);
    }
  }

  onPopIn = (data) => {
    console.log('on pop in', data);
    // PopIn is only called from the one button, so switch the modal to open
    setPopped(data.pathname.slice(1), 'open');
  }

  handleStoreUpdate = () => {
    // Don't send an update if there aren't any poppers open
    if (this.poppers.length > 0) {
      // Do we need to?
      const state = mapState(store.getState());
      const changes = diff(this.lastPopperUpdate, state);

      if (changes) {
        this.updatePopper(state);
      }
    }
  }

  updatePopper = (state) => {
    // Keep track of the state changes we're sending and then emit the change
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
    // TODO: Tell the poppers that we're disconnecting so they can close gracefully.
    this.socket.disconnect();
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
