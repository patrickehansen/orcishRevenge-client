import store from './store';

export const updateStore = (data) => {
  store.dispatch({
    type: 'BATCH_UPDATE',
    data: data,
  })
}