
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Collapse, Paper } from '@material-ui/core';
import styles from '../style/styles';

import config from '../../../../config';

class ErrorComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  onError = (error) => {
    setTimeout(this.clearError, config.errorClearTime);

    this.setState({
      error,
    });
  }

  clearError = () => {
    this.setState({
      error: null,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.onError(this.props.error);
    }
  }

  render() {
    return (
      <Collapse in={!!this.state.error} >
        <Paper elevation={0} className='error'>
          {this.state.error}
        </Paper>
      </Collapse>
    );
  }
}

ErrorComponent.propTypes = {
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ErrorComponent);
