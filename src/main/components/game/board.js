
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/styles';


import ErrorComponent from '../util/error';
import GameBoard from './board/gameBoard';
import styles from '../style/styles';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      openSheet: false,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component='div' className={`${classes.boardRoot} board-root`}>
        <GameBoard 
          paneSize={this.props.paneSize}
        />
        
        <ErrorComponent error={this.state.error} />
      </Container>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  paneSize: PropTypes.number.isRequired,
};

export default withStyles(styles)(Board);
