'use strict';

import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';
//import {setChatMessages} from '../../store/actions/actions';

const api = config.server + '/api/notepad';

export default async function updateNotepad (id, text, title) {
  console.log(store, store.getState(), store.getState().id_token)
  let response = await axios.patch(
    api,
    {
      NotepadID : id,
      Text: text,
      Title: title,
    },
    {
      headers: {'Authorization': store.getState().account.id_token}
    }
  ).catch((error) => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }else{
      throw new Error('Could not connect to server.');
    }
  })

  return !!response.data;
}