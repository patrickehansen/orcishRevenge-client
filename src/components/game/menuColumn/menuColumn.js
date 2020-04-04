
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AssignIcon from '@material-ui/icons/Assignment';
import Collections from '@material-ui/icons/Collections';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import CharacterSheetContainer from '../characterSheet/characterSheetContainer';
import { ContainedButton as Button } from '../../primitives/button';
import { VerticalFlex } from '../../primitives/layout';
import styles from '../../style/styles';

import { setLoggingOut } from '../../../store/actions/actions';

class MenuColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoutOpen: false,
      openSheet: false,
      pinned: false,
      hover: false,
    };
  }

  logout = (e) => {
    e.preventDefault();

    setLoggingOut(true);
  }

  handlePopoutClosing = () => {
    this.setState({
      popoutOpen: false,
      openSheet: false,
    });
  };

  handleOpenPopout = () => {
    this.setState({
      popoutOpen: true,
      openSheet: true,
    });
  };

  openCharacterSheet = () => {
    this.setState({ openSheet: true });
  }

  closeCharacterSheet = () => {
    this.setState({ openSheet: false });
  }

  onMouseEnter = (e) => {
    this.setState({
      hover: true
    })
  }

  onMouseLeave = (e) => {
    this.setState({
      hover: false
    })
  }

  render() {
    const { classes } = this.props;

    // TODO: Implement the open menu functionality
    // When closed: a single button, then when hover open to the left, then expand down to open up the menu
    // Allow button click to pin the menu open, click again and it closes
    // Rotate the button to give different visuals
    // Biggest issue here is the animation, as it's a 2-stage animation
    const open = this.state.hover || this.state.pinned ;

    return (
      <VerticalFlex
        className={`${classes.menuColumn}  menuColumn`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      > 
        {
          <div>
            <Container
              className={`${classes.menuColumnContainer} menuButton`}
            >
              <IconButton onClick={this.openCharacterSheet}>
                <AssignIcon />
              </IconButton>
            </Container>
            <Container
              className={`${classes.menuColumnContainer} menuButton`}
            >
              <IconButton onClick={this.handleOpenPopout}>
                <Collections/> 
              </IconButton>
            </Container>
            <Container
              className={`${classes.menuColumnContainer} menuButton`}
            >
              <IconButton onClick={this.logout}>
                <ExitToAppIcon />
              </IconButton>
            </Container>
          </div>          


        }
        <CharacterSheetContainer
            open={this.state.openSheet}
            onClose={this.closeCharacterSheet}
          />
      </VerticalFlex>
    );
  }
}

MenuColumn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(withStyles(styles)(MenuColumn));
