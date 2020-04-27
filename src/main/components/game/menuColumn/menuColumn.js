
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import AssignIcon from '@material-ui/icons/Assignment';
import Collections from '@material-ui/icons/Collections';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import CharacterSheetContainer from '../characterSheet/characterSheetContainer';
import { ContainedButton as Button } from '../../primitives/button';
import { VerticalFlex } from '../../primitives/layout';
import styles from '../../style/styles';

import { setLoggingOut } from '../../../store/actions/actions';
import socketClient from '../../../socket/socketClient';

const stats = ['END', 'STR', 'AGI', 'RSN', 'SPD', 'MAG', 'ALT', 'MEL', 'ACC'];

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

  statRoll = (e) => {
    const stat = e.target.innerText;

    this.props.socketClient.Roll(stat, 'stat');
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
      <div className='menuColumn'>
        <div className='menuTop'>
          <VerticalFlex
            className={`${classes.menuColumn}`}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          > 
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
          </VerticalFlex>
        </div>
        
        <div className={`${classes.menuMiddle}`}>
          <VerticalFlex
            className={`${classes.middleMenuColumn}`}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          > 
          {
            stats.map((v,i) => {
              return (
                <div 
                  className={classes.statButtonContainer}
                  key={i}
                >
                <Button
                  onClick={this.statRoll}
                  className={classes.statButton}
                >
                  {v}
                </Button>
                </div>
                
              )
            })
          }
          </VerticalFlex>
        </div>
        <div className='menuBottom'>
        </div>

        
        <CharacterSheetContainer
          open={this.state.openSheet}
          onClose={this.closeCharacterSheet}
        />
      </div>
    );
  }
}

MenuColumn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  socketClient : state.game.socketClient
});

export default connect(mapStateToProps)(withStyles(styles)(MenuColumn));
