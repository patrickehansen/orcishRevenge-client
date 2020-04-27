//import http from 'http';

//const server= http.createServer();

class SocketServer {
  constructor() {
    const bc = new BroadcastChannel('test_channel');
    bc.onmessage = function (ev) { console.log('message received', ev); }

    //this.server.on('connection', this.handleConnection);
  }

  receiveMessage(message) {
    console.log('received message', message);
  }

  handleDisconnect( client, reason) {
    console.log('disconnected', reason, client)
  }

  handleConnection(client) {
    client.on('disconnect', (reason) => { this.handleDisconnect(client, reason)});
    client.on('register', (data) => {this.registerClient(client, data)});

  }

  registerClient(client, data) {
    console.log('registering client', data, client)
  }


}

export default SocketServer;
