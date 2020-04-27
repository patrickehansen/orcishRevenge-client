import SocketClient from '../../socket/socketClient';
import SocketServer from '../../socket/socketServer';

const defaultAuthenticationState = {
  characters: [],
  possessedCharacter: null,
  socketClient: null,
  socketServer: null,
};

export default (state = defaultAuthenticationState, action) => {
  switch (action.type) {
    case 'CLOSE_SOCKET' : {
      state.socketClient.disconnect();

      return {...state, socketClient : null};
    }
    case 'OPEN_SOCKET' : 
      return {
        ...state, 
        socketClient: new SocketClient({}),
        socketServer: new SocketServer({}),
      };
    case 'SET_CHARACTERS':
      return { ...state, characters: action.characters };
    case 'UPDATE_CHARACTER': {
      const updated = {};

      const characters = [...state.characters];
      characters.some((v) => {
        if (v._id === action.character._id) {
          v = action.character; // eslint-disable-line no-param-reassign
          return true;
        }
        return false;
      });

      updated.characters = characters;

      if (state.possessedCharacter && state.possessedCharacter._id === action.character._id) {
        updated.possessedCharacter = action.character;
      }

      return { ...state, ...updated };
    }
    case 'SET_PLAYERS':
      return { ...state, players: action.players };
    case 'SET_CHARACTER_INFO':
      return { ...state, possessedCharacter: action.info };
    default:
      return state;
  }
};
