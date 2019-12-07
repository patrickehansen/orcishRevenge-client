
import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';

const api = `${config.server}/api/character/create`;

export default async function createCharacter(character) {
  const response = await axios.put(
    api,
    character,
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

  return response;
}
