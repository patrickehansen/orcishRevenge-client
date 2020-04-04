import config from '../../../config';

const defaultAuthenticationState = {
  IDToken: localStorage.getItem(config.localstorageKey),
  availableCharacters: [],
  possessedCharacter: null,
  loggingOut: false,
  username: null,
};

// console.log(localStorage.getItem(config.localstorageKey))
const authenticationReducer = (state = defaultAuthenticationState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, IDToken: action.IDToken };
    case 'SET_ACCOUNT_DETAILS': {
      return { ...state, ...action.details };
    }
    case 'SET_AVAILABLE_CHARACTERS': {
      return { ...state, availableCharacters: action.characters };
    }
    case 'SET_SPECTATOR': {
      return { ...state, isSpectator: action.isSpectator };
    }
    case 'SET_GM': {
      return { ...state, isGM: action.isGM };
    }
    case 'SET_LOGGING_OUT': {
      return { ...state, loggingOut: action.loggingOut};
    }
    default:
      return state;
  }
};

export default authenticationReducer;
