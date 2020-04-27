

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Container, DialogActions, DialogContent} from '@material-ui/core';
import Button from '../primitives/button/containedButton';
import { withStyles } from '@material-ui/styles';
import styles from '../style/styles';


class Confirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adding : false,
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.cancel}
        >
        <Container className={classes.confirm}>
          <DialogContent>
            Are you sure?
          </DialogContent>
          <DialogActions className={classes.spaceBetween}>
            <Button onClick={this.props.cancel} color='default'>
              Cancel
            </Button>
            <Button onClick={this.props.confirm}>
              Confirm
            </Button>
          </DialogActions>
        </Container>
      </Modal>
    );
  }
}

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};


export default withStyles(styles)(Confirm);
