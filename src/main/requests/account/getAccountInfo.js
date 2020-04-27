
import axios from 'axios';
import config from '../../../../config';
import store from '../../store/store';
import { setAccountDetails, setToken } from '../../store/actions/actions';

const api = `${config.server}/api/account/details`;

export default async function getAccountDetails() {
  const response = await axios.get(
    api,
    {
      headers: { Authorization: store.getState().account.IDToken },
    },
  ).catch((error) => {
    if (error.response && error.response.data) {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('logging out by force');
        localStorage.removeItem(config.localstorageKey);
        setToken(null);
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Could not connect to server.');
    }
  });

  if (response && response.data) {
    setAccountDetails(response.data);
  }

  return !!response.data;
}
