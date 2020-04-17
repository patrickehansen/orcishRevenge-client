
import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';
import { setCharacterInfo } from '../../store/actions/actions';

const api = `${config.server}/api/character/editStats`;

export default async function editCharacterStats(newStats, characterID) {
  const response = await axios.patch(
    api,
    {
      Stats: newStats,
      CharacterID: characterID,
    },
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
    setCharacterInfo(response.data);
  }
}
