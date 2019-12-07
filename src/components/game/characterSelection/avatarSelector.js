
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { ContainedButton as Button } from '../../primitives/button';

const Transition = React.forwardRef((props, ref) => // eslint-disable-line react/display-name
   <Slide direction="up" ref={ref} {...props} />, // eslint-disable-line implicit-arrow-linebreak
); // eslint-disable-line function-paren-newline


class AvatarSelector extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.hideAvatar}
        TransitionComponent={Transition}
        keepMounted
      >
        <form onSubmit={this.props.submit}>
          <DialogTitle>
            Select your Avatar
          </DialogTitle>
          <DialogContent>

          <DialogContentText>
            Paste a link to the avatar image you would like to use. At this time, only Imgur links are supported.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            name='avatarURL'
            ref={(ref) => { this.textRef = ref; }}
            id='url'
            label='Imgur URL'
            type='url'
            fullWidth={true}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.hideAvatar}>
              Cancel
            </Button>
            <Button type='submit'>
              Submit
            </Button>
          </DialogActions>
        </form>

      </Dialog>
    );
  }
}

AvatarSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  hideAvatar: PropTypes.func.isRequired,
};

export default AvatarSelector;
