'use strict';
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AssignIcon from '@material-ui/icons/Assignment'
import Button from '../primitives/button';

import MenuColumn from './menuColumn/menuColumn';
import {withStyles} from '@material-ui/styles';

import ErrorComponent from '../util/error';
import GameBoard from './board/gameBoard';
import {styles} from '../style/styles';

class Board extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        openSheet: false,
      }
    }



    render() {
      const {classes} = this.props;

      return (
        <Container component='div' className='board-root'>
          <GameBoard />
          <MenuColumn />
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

export default withStyles(styles)(Board);