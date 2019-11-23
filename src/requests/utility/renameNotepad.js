'use strict';

import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';
import {updateNotepad} from '../../store/actions/actions';

const api = config.server + '/api/notepad';

export default async function renameNotepad (id, title) {
  //console.log(store, store.getState(), store.getState().id_token)
  let response = await axios.patch(
    api,
    {
      NotepadID : id,
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

  if (response && response.data) {
    updateNotepad(response.data);
  }

  return !!response.data;
}