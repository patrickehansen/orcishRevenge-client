const defaultAuthenticationState = {
  notepads: {},
};

export default (state = defaultAuthenticationState, action) => {
  switch (action.type) {
    case 'ADD_NOTEPAD': {
      const { notepad } = action;
      const notepads = { ...state.notepads };
      notepads[notepad._id] = notepad;

      return { ...state, notepads };
    }

    case 'UPDATE_NOTEPAD': {
      const { notepad } = action;
      const notepads = { ...state.notepads };
      notepads[notepad._id] = notepad;

      return { ...state, notepads };
    }

    // case 'SET_NOTEPADS' :
    //   return Object.assign({}, state, {
    //     notepads: action.notepads,
    //   })
    default:
      return state;
  }
};
