'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AssignIcon from '@material-ui/icons/Assignment'

import CharacterSheetContainer from '../characterSheet/characterSheetContainer';
import Popout from '../../util/popout';
import Button from '../../primitives/button';
import {VerticalFlex} from '../../primitives/layout';
import {styles} from '../../style/styles';

class MenuColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoutOpen: false,
      openSheet: false,
    }
  }

  logout = (e) => {
    e.preventDefault();

    this.props.onLogout();
  }

  handlePopoutClosing = () => {
    this.setState({
      popoutOpen: false
    });
  };

  handleOpenPopout = () => {
    this.setState({
      popoutOpen: true
    });
  };

  openCharacterSheet = (e) => {
    console.log('opening sheet')
    this.setState({openSheet: true})
  } 

  closeCharacterSheet = (e) => {
    console.log('closing sheet');
    this.setState({openSheet: false})
  }

  render() {
    const {classes} = this.props;
    console.log('open?', this.state.openSheet)

    return (
      <VerticalFlex
        className={classes.menuColumn}
      >
        <Container
          className={classes.menuColumnContainer}
        >
          <IconButton onClick={this.openCharacterSheet}>
            <Badge badgeContent={0} color='primary'>
              <AssignIcon />
            </Badge>
          </IconButton>
        </Container>
        <Container
          className={classes.menuColumnContainer} 
        >
          <Button onClick={this.handleOpenPopout}>
            Open Popout
          </Button>
        </Container>
        <Container
          className={classes.menuColumnContainer}
        >
          <Button className='logoutBtn' onClick={this.logout}>
            Logout
          </Button>
        </Container>

        <CharacterSheetContainer 
          open={this.state.openSheet}
          onClose={this.closeCharacterSheet}
        />
      </VerticalFlex>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(withStyles(styles)(MenuColumn))