
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import { VerticalFlex } from '../../primitives/layout';

import AssignIcon from '@material-ui/icons/Assignment';

import GMMenu from '../gm/gmMenu';

import styles from '../../style/styles';

class GMBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    }
  }

  openMenu = () => {
    this.setState({
      showMenu: true,
    })
  }

  closeMenu = () => {
    this.setState({
      showMenu: false
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <VerticalFlex
          className={classes.gmBar}
        >
          <Container
            className={`${classes.leftMenuColumnContainer} menuButton`}
          >
            <IconButton onClick={this.openMenu}>
              <AssignIcon />
            </IconButton>
          </Container>
        </VerticalFlex>

        <GMMenu 
          open={this.state.showMenu}
          close={this.closeMenu}
        />
      </div>
      
    )
  }
}

GMBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  socketClient : state.game.socketClient
});

export default connect(mapStateToProps)(withStyles(styles)(GMBar));