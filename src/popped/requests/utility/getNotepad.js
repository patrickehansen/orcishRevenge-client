
import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';
import { addNotepad } from '../../store/actions/actions';

const api = `${config.server}/api/notepad/`;

export default async function getNotepad(id) {
  // console.log(store, store.getState(), store.getState().IDToken)
  const response = await axios.get(
    api + id,
    {
      headers: { Authorization: store.getState().account.IDToken },
    },
  ).catch((error) => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Could not connect to server.');
    }
  });

  if (response && response.data) {
    addNotepad(response.data);
  }

  return !!response.data;
}
