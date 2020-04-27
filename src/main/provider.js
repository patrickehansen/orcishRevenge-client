import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from './theme';
import Store from './store/store';

export default function ProviderStack({ children }) {
  return (
    <Provider store={Store}>
      <Theme >
        <CssBaseline />
        {children}
      </Theme>
    </Provider>
  );
}

ProviderStack.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
