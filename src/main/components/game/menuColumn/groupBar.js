
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import { HorizontalFlex } from '../../primitives/layout';
import styles from '../../style/styles';

import AssignIcon from '@material-ui/icons/Assignment';
import Storage from '@material-ui/icons/Storage';

import GroupInventory from '../group/groupInventory';
import GroupNotes from '../group/groupNotes';

class GroupBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInventory: false,
      showNotes: false,
    }
  }

  openInventory = () => {
    this.setState({
      showInventory: true
    })
  }

  openNotes = () => {
    this.setState({
      showNotes: true
    })
  }

  closeInventory = () => {
    this.setState({
      showInventory: false
    })
  }

  closeNotes = () => {
    this.setState({
      showNotes: false
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <HorizontalFlex
          className={classes.groupBar}
        >
          <Container
            className={`${classes.verticalMenuContainer} menuButton`}
          >
            <IconButton onClick={this.openGroupNotes}>
              <AssignIcon />
            </IconButton>
          </Container>
          <Container
            className={`${classes.verticalMenuContainer} menuButton`}
          >
            <IconButton onClick={this.openGroupInventory}>
              <Storage />
            </IconButton>
          </Container>
        </HorizontalFlex>
        <GroupInventory 
          open={this.state.showInventory}
          close={this.closeInventory}
        />
        <GroupNotes 
          open={this.state.showNotes}
          close={this.closeNotes}
        />
      </div>
      
    )
  }
}

GroupBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  socketClient : state.game.socketClient
});

export default connect(mapStateToProps)(withStyles(styles)(GroupBar));