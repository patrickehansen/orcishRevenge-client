
import axios from 'axios';
import config from '../../../../config';
import store from '../../store/store';
import { setCharacters } from '../../store/actions/actions';

const api = `${config.server}/api/game/characters`;

export default async function getCharacters() {
  const response = await axios.get(
    api,
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

  setCharacters(response.data);
}
