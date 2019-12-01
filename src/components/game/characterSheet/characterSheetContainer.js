'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import { DialogContent } from '@material-ui/core';
import Theme from '../../../theme';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AssignIcon from '@material-ui/icons/Assignment';

import Store from '../../../store/store';

import Popout from '../../util/popout';

import CharacterSheet from './characterSheet';
import Button from '../../primitives/button';
import {VerticalFlex} from '../../primitives/layout';
import {styles} from '../../style/styles';
import PoppedOutCharacter from './poppedOutCharacter';


class CharacterSheetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poppedOut: false,
      modalOpen: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.poppedOut && !prevProps.open) {
      this.setState({
        poppedOut: false,
      })
    }
  }

  popout = () => {
    this.setState({
      poppedOut: !this.state.poppedOut
    })
  }

  onPopoutClosing = () => {
    console.log('popout closing');
    this.setState({
      poppedOut: false
    })

    this.props.onClose()
  }
  
  render() {
    console.log('char sheet', this.state.poppedOut)
    return (
      <Container>
        <Modal        
          open={this.props.open && !this.state.poppedOut}
          onClose={this.props.onClose}
        >
          <DialogContent>
          <CharacterSheet 
            character={this.props.character}
            poppedOut={this.state.poppedOut}
            onPopout={this.popout}
          />
          </DialogContent>
          
        </Modal>
        {
          this.state.poppedOut && (
            <Popout
              title={this.props.character ? this.props.character.Name : ''}
              containerId='charPopout'
              onClosing={this.onPopoutClosing}
            >
              <CharacterSheet 
                character={this.props.character}
                poppedOut={this.state.poppedOut}
                onPopout={this.popout}
              />
            </Popout>
          )
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    character: state.game.possessedCharacter,
  }
}

export default connect(mapStateToProps)(CharacterSheetContainer)