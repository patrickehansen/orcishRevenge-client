
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import { DialogContent } from '@material-ui/core';
import config from '../../../../../config';

import CharacterSheet from './characterSheet';

import { setPopped } from '../../../store/actions/actions';

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
    console.log('heyo popout, csc')
    window.open(config.popperURL + '/character', '', 'width=1120,height=770,left=400,top=200');
    
    setPopped('character', 'popped')
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
          open={this.props.popped === 'open'}
          onClose={this.props.onClose}
        >
          <DialogContent >
            <CharacterSheet
              character={this.props.character}
              poppedOut={false}
              onPopout={this.popout}
              onClose={this.props.onClose}
            />
          </DialogContent>
        </Modal>
      </Container>
    );
  }
}

CharacterSheetContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  popped: state.game.popped.character
})

export default connect(mapStateToProps)(CharacterSheetContainer);
