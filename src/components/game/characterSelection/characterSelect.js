'use strict';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';

import GetAvailableCharacters from '../../../requests/character/availableCharacters';
import PossessCharacter from '../../../requests/character/possessCharacter';

import CharacterCreator from './characterCreator';
import CharacterCard from './characterCard';

import {VerticalFlex} from '../../primitives/layout';

import ErrorComponent from '../../util/error';
import {styles} from '../../style/styles';

class CharacterSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      creating: false,
    }
  }

  componentDidMount() {
    GetAvailableCharacters();
  }

  createCharacter = (e) => {
    e.preventDefault();

    this.setState({
      creating: true,
    })
  }

  closeCreator = (e) => {
    this.setState({
      creating: false,
    })
  }

  play = async (e) => {
    await PossessCharacter(this.state.selected.id);

    this.props.close();
  }

  characterSelected = (name, id) => {
    this.setState({
      selected: {
        name, id
      }
    })
  }

  render() {
    const characters = [...this.props.availableCharacters];
    characters.push({
      _id: 'spectator',
      Name: 'Spectator',
      Avatar: 'https://imgur.com/hxrMCCD.png',
    })

    if (this.props.canBeGM) {
      characters.push({
        _id: 'gm',
        Name: 'GM',
        Avatar: 'https://imgur.com/mqii5iw.png',
      })
    }

    const {classes} = this.props;

    return (
      <Modal        
        open={this.props.open}
        onClose={this.props.close}
      >
        <VerticalFlex className={classes.characterSelect} id='characterSelectModal'>
          <VerticalFlex className={`${classes.characterContainer} ${classes.grow} characterContainer`}>
            <Grid container spacing={2} justify='center' className={classes.grow}>
            {
              characters.map((v,i) => {
                const active = this.state.selected ? this.state.selected.name === v.Name : false;

                return (
                  <Grid item key={i} >
                    <CharacterCard character={v} onSelect={this.characterSelected} active={active}/>
                  </Grid>
                  
                )
              })
            }
            </Grid>
            {
              this.state.selected && <div className={`${classes.fixed} ${classes.centered}`}>
              <Button
                variant='contained'
                color='primary'
                id='createNewBtn'
                onClick={this.play}
              >
                Play as {this.state.selected.name}
              </Button>
            </div>
            }
            
          </VerticalFlex>
          
          <div className='createBtn'>
            <Button 
              onClick={this.createCharacter}
              variant='contained'
              color='primary'
              id='createNewBtn'
            >Create New</Button>
          </div>
          <CharacterCreator 
            open={this.state.creating}
            onClose={this.closeCreator}
            />
          <ErrorComponent error={this.state.error} />
        </VerticalFlex>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    availableCharacters: state.account.availableCharacters,
    canBeGM: state.account.IsGM,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CharacterSelect));