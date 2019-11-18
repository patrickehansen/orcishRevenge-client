import store from '../store';

export const setColor = (category, label, color) => {
  store.dispatch({
    type: 'SET_COLOR',
    category,
    label,
    color,
  })
}
