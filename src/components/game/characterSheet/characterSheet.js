
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import FlipToBack from '@material-ui/icons/FlipToBack';
import FlipToFront from '@material-ui/icons/FlipToFront';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

import { ContainedButton as Button } from '../../primitives/button';

import { HorizontalFlex } from '../../primitives/layout';

import CharacterStats from './characterStats';
import CharacterSkills from './characterSkills';
import CharacterInventory from './characterInventory';
import CharacterNotes from './characterNotes';


class CharacterSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      tabSelected: 0,
    };
  }

  onBrowseTabClicked = (e, newValue) => {
    this.setState({
      tabSelected: newValue,
    });
  }

  render() {
    const { character, classes } = this.props;

    return (
      <Container className={`${classes.characterSheet} characterSheet`}>
        <HorizontalFlex >
          <Typography variant='h2' className={classes.grow} >
            {character && character.Name}
          </Typography>

          <HorizontalFlex className={classes.sheetControls}>
          {
            this.props.poppedOut
              ? <Container className={classes.popoutIcon}>
              <FlipToBack style={{ cursor: 'pointer' }} onClick={this.props.onPopout}/>
            </Container>
              : <Container className={classes.popoutIcon}>
              <FlipToFront style={{ cursor: 'pointer' }} onClick={this.props.onPopout}/>
            </Container>
          }
          {
            !this.props.poppedOut && (
              <Button className={`${classes.characterCloseButton} ${classes.right}`} onClick={this.props.onClose}>
                <CloseIcon onClick={this.props.onClose}/>
              </Button>
            )
          }
          </HorizontalFlex>
        </HorizontalFlex>

        <Container className={classes.characterSheetMain}>
          <Container
            position="static"
            style={{ padding: 0 }}
          >
            <Tabs
              value={this.state.tabSelected}
              onChange={this.onBrowseTabClicked}
              aria-label="character sheet"
              indicatorColor='primary'
              textColor='inherit'
              className={classes.characterTabs}
            >
              <Tab label='Stats' id={'simple-tabpanel-0'} aria-controls={'simple-tabpanel-0'} className={classes.characterTab}/>
              <Tab label='Skills' id={'simple-tabpanel-1'} aria-controls={'simple-tabpanel-1'} className={classes.characterTab}/>
              <Tab label='Inventory' id={'simple-tabpanel-2'} aria-controls={'simple-tabpanel-2'} className={classes.characterTab}/>
              <Tab label='Notes' id={'simple-tabpanel-3'} aria-controls={'simple-tabpanel-3'} className={classes.characterTab}/>
            </Tabs>
          </Container>

          <CharacterStats
            value={this.state.tabSelected}
            index={0}
            character={character}
          />

          <CharacterSkills
            value={this.state.tabSelected}
            index={1}
            character={character}
          />

          <CharacterInventory
            value={this.state.tabSelected}
            index={2}
            character={character}
          />

          <CharacterNotes
            value={this.state.tabSelected}
            index={3}
            character={character}
          />

        </Container>
      </Container>
    );
  }
}

CharacterSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  poppedOut: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPopout: PropTypes.func.isRequired,
};

export default withStyles(styles)(CharacterSheet);
