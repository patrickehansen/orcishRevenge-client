const defaultAuthenticationState = {
  chatMessages: [],
};

export default (state = defaultAuthenticationState, action) => {
  switch (action.type) {
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.message] };
    case 'SET_CHAT_MESSAGES':
      return { ...state, chatMessages: action.messages };
    default:
      return state;
  }
};
