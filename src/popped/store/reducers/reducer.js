import { combineReducers } from 'redux';

import SocketClient from '../../socket/socketClient';

const defaultAuthenticationState = {
  possessedCharacter: null,
  socketClient: new SocketClient(),
  game: {},
  notepad: {},
  account: {},
  style: {palette: {
    primary: {
      main: '#283593', // '#556cd6',
    },
    secondary: {
      main: '#004d40',
    },
    common: {
      blueGray: '#5A6E78',
      white: '#d8d8d8',
      dark: 'rgb(50,57,61)',
      black: '#000',
    },
    tertiary: {
      main: '#990096',
    },
    error: {
      main: '#8a1313',

    },
    white: {
      main: '#d8d8d8',
    },
    gray: {
      main: '#eb4034',
    },
    background: {
      card: '#708090',
      default: '#ededed',
      menu: '#c7cad1',
      solidGray: 'rgba(200,200,200,1)',
      transparentGray: 'rgba(189,189,189,0.5)',
    },
  }},
  pathname: '/',
};

export default (state = defaultAuthenticationState, action) => {
  switch (action.type) {
    case 'BATCH_UPDATE' : {
      console.log('batch update');
      return {
        ...state,
        game: {
          possessedCharacter: action.data.character,
        },
        notepad : {
          notepads : action.data.allNotepads
        },
        account: {
          isGM: action.data.isGM,
        }
      }
    }
    case 'SET_PATHNAME': {
      return {
        ...state,
        pathname: action.pathname
      }
    }
    default:
      return state;
  }
};
