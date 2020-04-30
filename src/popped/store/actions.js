import store from './store';

export const updateStore = (data) => {
  store.dispatch({
    type: 'BATCH_UPDATE',
    data: data,
  })
}

export const setPathname = (pathname) => {
  const current = store.getState();

  if (current.pathname !== pathname) {
    store.dispatch({
      type: 'SET_PATHNAME',
      pathname: pathname,
    })
  }
}