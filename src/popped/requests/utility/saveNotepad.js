
import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';

const api = `${config.server}/api/notepad`;

export default async function saveNotepad(notepad) {
  const response = await axios.patch(
    api,
    notepad,
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

  return !!response.data;
}
