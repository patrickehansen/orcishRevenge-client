import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import Theme from './theme'
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/app';
import Store from './store/store';
import 'react-quill/dist/quill.snow.css';

let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );
document.title = 'Orcish Revenge';

const jsx = (
  <Provider store={Store}>
    <Theme >
      <CssBaseline />
      <App />
    </Theme>
  </Provider>
);

// Now we can render our application into it
render( jsx, document.getElementById('root') );