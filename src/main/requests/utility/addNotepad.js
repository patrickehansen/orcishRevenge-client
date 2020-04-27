import axios from 'axios';
import config from '../../../../config';
import store from '../../store/store';
import { addNotepad, updateCharacter } from '../../store/actions/actions';

const api = `${config.server}/api/notepad`;

export default async function (text, title, character) {
  // console.log(store, store.getState(), store.getState().IDToken)
  const response = await axios.post(
    api,
    {
      Text: text,
      Title: title,
      CharacterID: character,
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

  console.log('addNotepad resposne', response.data);
  if (response && response.data) {
    if (response.data.notepad) addNotepad(response.data.notepad);
    if (response.data.character) updateCharacter(response.data.character);
  }

  return !!response.data;
}
