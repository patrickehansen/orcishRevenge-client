
import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';
import { updateCharacter } from '../../store/actions/actions'; 

const api = `${config.server}/api/character/skills/delete`;

export default async function deleteSkill(skill, characterId) {
  const response = await axios.delete(
    api,
    {
      ...skill,
      character: characterId,
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
