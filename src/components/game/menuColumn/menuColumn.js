
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AssignIcon from '@material-ui/icons/Assignment';

import CharacterSheetContainer from '../characterSheet/characterSheetContainer';
import { ContainedButton as Button } from '../../primitives/button';
import { VerticalFlex } from '../../primitives/layout';
import styles from '../../style/styles';

class MenuColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoutOpen: false,
      openSheet: false,
    };
  }

  logout = (e) => {
    e.preventDefault();

    this.props.onLogout();
  }

  handlePopoutClosing = () => {
    this.setState({
      popoutOpen: false,
    });
  };

  handleOpenPopout = () => {
    this.setState({
      popoutOpen: true,
    });
  };

  openCharacterSheet = () => {
    this.setState({ openSheet: true });
  }

  closeCharacterSheet = () => {
    this.setState({ openSheet: false });
  }

  render() {
    const { classes } = this.props;

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
    );
  }
}

MenuColumn.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(withStyles(styles)(MenuColumn));
