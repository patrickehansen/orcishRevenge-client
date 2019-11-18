'use strict';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';

import Stats from './stats';
import Skills from './skills';
import Inventory from './inventory';
import Notes from './notes';


class CharacterSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      tabSelected: 0,
    }
  }

  onBrowseTabClicked = (e, newValue) => {
    this.setState({
      tabSelected: newValue
    })
  }
  
  render() {
    const {character, classes} = this.props;

    return (
      <Modal        
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className={classes.characterSheet}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant='h2' >
              {character && character.Name}
            </Typography>
            <div style={{float: 'right', borderRadius: '3px', backgroundColor: 'blue', color: 'white', maxHeight: '2rem', paddingTop: '0.3rem', cursor: 'pointer', boxShadow: '1px 1px 3px black'}}>
              <CloseIcon onClick={this.props.onClose}/>
            </div>
          </div>
          
          <Container className={classes.characterSheetMain}>
            <AppBar 
              position="static"
              style={{padding: 0}}
              >
              <Tabs 
                value={this.state.tabSelected} 
                onChange={this.onBrowseTabClicked} 
                aria-label="character sheet"
                indicatorColor='primary'
                textColor='inherit'
                className={classes.characterTabs}
              >
                <Tab label='Stats' id={`simple-tabpanel-0`} aria-controls={`simple-tabpanel-0`} className={classes.characterTab}/>
                <Tab label='Skills' id={`simple-tabpanel-1`} aria-controls={`simple-tabpanel-1`} className={classes.characterTab}/>
                <Tab label='Inventory' id={`simple-tabpanel-2`} aria-controls={`simple-tabpanel-2`} className={classes.characterTab}/>
                <Tab label='Notes' id={`simple-tabpanel-3`} aria-controls={`simple-tabpanel-3`} className={classes.characterTab}/>
              </Tabs> 
            </AppBar>

            <Stats 
              value={this.state.tabSelected} 
              index={0}
              character={character}
            />

            <Skills 
              value={this.state.tabSelected} 
              index={1}
              character={character}
            />

            <Inventory 
              value={this.state.tabSelected} 
              index={2}
              character={character}
            />

            <Notes 
              value={this.state.tabSelected} 
              index={3}
              character={character}
            />

          </Container>
        </Container>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    character: state.game.possessedCharacter,
  }
}

const styled = withStyles(styles)(CharacterSheet);
export default connect(mapStateToProps)(styled);