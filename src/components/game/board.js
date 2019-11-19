'use strict';
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AssignIcon from '@material-ui/icons/Assignment'
import Button from '../primitives/button';
import {withStyles} from '@material-ui/styles';

import CharacterSheet from './characterSheet/characterSheet';
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

    logout=(e) => {
      e.preventDefault();

      this.props.onLogout();
    }

    openCharacterSheet = (e) => {
      this.setState({openSheet: true})
    } 

    closeCharacterSheet = (e) => {
      this.setState({openSheet: false})
    }

    render() {
      const {classes} = this.props;

      return (
        <Container component='div' className='board-root'>
          <Container className={`${classes.horizontalFlex} ${classes.spaceBetween}`}>
            <Button className='logoutBtn' onClick={this.logout}>
              Logout
            </Button>
            <IconButton onClick={this.openCharacterSheet}>
              <Badge badgeContent={0} color='primary'>
                <AssignIcon />
              </Badge>
            </IconButton>
          </Container>
          
          <GameBoard />
          <CharacterSheet 
            open={this.state.openSheet}
            onClose={this.closeCharacterSheet}
          />
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

export default withStyles(styles)(Board);