
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import SplitPane from 'react-split-pane';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import getChatHistory from '../../requests/chat/getChatHistory';
import getPlayers from '../../requests/game/getPlayers';
import getNotepad from '../../requests/utility/getNotepad';
import getAccountDetails from '../../requests/account/getAccountInfo';

import MenuColumn from './menuColumn/menuColumn';


import { setCharacterInfo, setToken, setLoggingOut } from '../../store/actions/actions';

import config from '../../../config';

import Board from './board';
import CharacterSelect from './characterSelection/characterSelect';
import ChatRoll from './chatroll';

import { openSocket, closeSocket } from '../../store/actions/actions';
import ErrorComponent from '../util/error';
import styles from '../style/styles';
import StyleUpdater from '../style/styleUpdater';


class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loggedOut: false,
      paneSize: 300,
    };
  }

  componentDidMount() {
    // console.log('Game component mounted. connecting to socket..')
    openSocket();

    getChatHistory();

    if (!this.props.username) {
      getAccountDetails();
    }

    if (!this.props.token) {
      this.setState({ loggedOut: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loggingOut && !prevProps.loggingOut) this.onLogout();
  }

  onSendChat = (message) => {
    this.props.socketClient.SendChatMessage(message);
  }

  onLogout = () => {
    // Remove the local storage key and set the store info to null
    localStorage.removeItem(config.localstorageKey);
    setToken(null);
    setCharacterInfo(null);

    // Disconnect and clear the socket client for GC
    closeSocket();

    // Set the loggingout that sent us here so we don't double fire
    setLoggingOut(false);

    // Set state for redirection
    this.setState({
      loggedOut: true,
    });
  }

  closeCharacterSelect = () => {
    // console.log('close character select')
    // this.forceUpdate();
    getPlayers();

    if (this.props.possessedCharacter && this.props.possessedCharacter.Notepads.length > 0) {
      this.props.possessedCharacter.Notepads.forEach((v) => {
        getNotepad(v);
      });
    }
  }

  dragEnd = (size) => {
    if (size) {
      this.setState({
        paneSize: size
      })
    }
    
  }

  render() {
    if (this.state.loggedOut) {
      return <Redirect to='/' />;
    }

    return (
      <Container
        className={`gameView-root ${this.props.classes.gameRoot}`}
      >
        <SplitPane
          split='vertical'
          minSize={220}
          defaultSize={300}
          maxSize={650}
          primary='second'
          onDragFinished={this.dragEnd}
        >
          <div>
            <Board 
              paneSize={this.state.paneSize}
            />
            <MenuColumn />
          </div>
          <ChatRoll
            onSendChat={this.onSendChat}
          />
        </SplitPane>
        <CharacterSelect open={!this.props.possessedCharacter} close={this.closeCharacterSelect}/>
        <StyleUpdater open={false} onClose={null}/>
        <ErrorComponent error={this.state.error} />
      </Container>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
  availableCharacters: PropTypes.array.isRequired,
  possessedCharacter: PropTypes.object,
  username: PropTypes.string,
  token: PropTypes.string.isRequired,
  loggingOut: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  possessedCharacter: state.game.possessedCharacter,
  availableCharacters: state.account.availableCharacters,
  loggingOut: state.account.loggingOut,
  username: state.account.username,
  token: state.account.IDToken,
  socketClient: state.game.socketClient,
});

export default withStyles(styles)(connect(mapStateToProps)(Game));
