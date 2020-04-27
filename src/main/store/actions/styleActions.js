import store from '../store';

export const setColor = (category, label, color) => { // eslint-disable-line import/prefer-default-export
  store.dispatch({
    type: 'SET_COLOR',
    category,
    label,
    color,
  });
};
