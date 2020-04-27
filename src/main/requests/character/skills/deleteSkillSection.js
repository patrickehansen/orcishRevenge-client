
import axios from 'axios';
import config from '../../../../../config';
import store from '../../../store/store';
import { updateCharacter } from '../../../store/actions/actions'; 

const api = `${config.server}/api/character/skillSection/delete`;

export default async function deleteSkillSection(section) {
  const response = await axios.post(
    api,
    {
      ...section,
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
