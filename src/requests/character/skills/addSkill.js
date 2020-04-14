
import axios from 'axios';
import config from '../../../../config';
import store from '../../../store/store';
import { updateCharacter } from '../../../store/actions/actions'; 

const api = `${config.server}/api/character/skills/create`;

export default async function createSkill(skill) {
  const response = await axios.put(
    api,
    {
      ...skill,
      character: store.getState().game.possessedCharacter['_id'],
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
    updateCharacter(response.data)
  }

  return !!response;
}
