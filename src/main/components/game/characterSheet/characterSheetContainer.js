
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import { DialogContent } from '@material-ui/core';import { DragDropContext } from 'react-beautiful-dnd';

import Popout from '../../util/popout';

import CharacterSheet from './characterSheet';


class CharacterSheetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poppedOut: false,
      modalOpen: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.poppedOut && !prevProps.open) {
      this.setState({
        poppedOut: false,
      });
    }
  }

  popout = () => {
    window.open('http://localhost:9001', '', 'width=600,height=400,left=200,top=200');
  }

  onPopoutClosing = () => {
    if (!this.state.poppedOut) return;

    this.setState({
      poppedOut: false,
    });

    this.props.onClose();
  }

  render() {
    return (
      <Container>
        <Modal
          open={this.props.open && !this.state.poppedOut}
          onClose={this.props.onClose}
        >
          <DialogContent >
            <CharacterSheet
              character={this.props.character}
              poppedOut={this.state.poppedOut}
              onPopout={this.popout}
              onClose={this.props.onClose}
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
                onClose={this.props.onClose}
              />
            </Popout>
          )
        }
      </Container>
    );
  }
}

CharacterSheetContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CharacterSheetContainer;
