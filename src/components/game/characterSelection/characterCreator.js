'use strict';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

import {withStyles, mergeClasses} from '@material-ui/styles';
import {styles} from '../../style/styles';
import StatsAssigner from './statsAssigner';
import AvatarSelector from './avatarSelector';
import PhysicalCharacteristics from './physicalCharacteristics';
import { Grid, Button } from '@material-ui/core';

import CreateCharacter from '../../../requests/character/createCharacter';
import RPlikes from './RPlikes';

class CharacterCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      stats: {
        Strength: 8,
        Agility: 8,
        Endurance: 8,
        Skill: 8,
        Speed: 8,
        MagicAffinity: 8,
        Alertness: 8,
      },
      physical: {
        EyeColor: 'Brown',
        SkinColor: 'Charcoal',
        HairColor: 'Black',
        Build: 'Muscular',
        Height: `5'10"`,
        Weight: '240',
        Age: '19',
      },
      remainingPoints: 24,
      avatarURL: null,
      avatarSelecting: false,
    }
  }

  increment = (stat) => {
    let {stats} = this.state;

    stats[stat] += 1;

    this.setState({
      stats,
      remainingPoints: this.state.remainingPoints - 1,
    })
  }

  decrement = (stat) => {
    let {stats} = this.state;

    stats[stat] -= 1;

    this.setState({
      stats,
      remainingPoints: this.state.remainingPoints + 1,
    })
  }

  changePhysical = (change) => {
    const {physical} = this.state;

    physical[change.Key] = change.Value;

    this.setState({
      physical
    })
  }

  cancel = (e) => {
    this.props.onClose();
  }

  submit = async (e) => {
    e.preventDefault();
    const values = Object.assign(this.state.stats, this.state.physical);

    values.AvatarURL = this.state.avatarURL;
    values.GeneralNotes = e.target.elements.GeneralNotes.value;
    values.Likes = [];

    ['Like', 'Dislike', 'Vice'].forEach((label) => {
      for (let i = 0; i <= 2; i++) {
        let title = e.target.elements[`${label}${i}`].value;
        let description = e.target.elements[`${label}Desc${i}`].value;

        values.Likes.push({Title: title, Description: description, Label: label})
      }
    })
    
    const success = await CreateCharacter(values).catch(error => {
      console.error('Error creating character', error);
      this.setState({
        error
      })
    })

    if (success) {
      this.props.onClose();
    }
  }

  openAvatarChooser = (e) => {
    this.setState({
      avatarSelecting : true
    })
  }

  closeAvatarChooser = (e) => {
    this.setState({
      avatarSelecting : false
    })
  }

  setAvatar = (e) => {
    e.preventDefault();

    this.setState({
      avatarURL: e.target.elements.avatarURL.value,
      avatarSelecting: false
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <Modal 
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.cancel} 
        className='board-root'
        >
        <div className='characterCreator'>
          <form id='creatorContainer' onSubmit={this.submit}>
            <Container className='characterHeader'>
              <Container className='characterBasicInfo'>
                <Avatar 
                  className='avatarplaceholder' 
                  src={this.state.avatarURL} 
                  onClick={this.openAvatarChooser}
                />
                <TextField 
                  id='characterName'
                  label='Name'
                  className={`${classes.textField} ${classes.invertColors}`}
                  style={{marginTop: '0.5rem', width: '75%'}}
                  inputProps={{style: {fontSize: '1.8rem'}}}
                  margin='none'
                  name='Name'
                  variant='outlined'
                  fullWidth={false}
                  autoFocus
                  required
                />
              </Container>
              <Container style={{float: 'right', width: '20rem'}}>
                <Button
                  variant='contained'
                  color='primary'
                  type='button'
                  className={'cancelBtn'}
                  fullWidth={false}
                  onClick={this.cancel}
                  style={{marginRight: '0.2rem'}}
                  >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  className={'submitBtn'}
                  fullWidth={false}
                >
                  Submit
                </Button>
              </Container>
            </Container>
            <Container className={`${classes.horizontalTextContainer}`} style={{margin: 0}}>
              <Container className={classes.fixed} style={{margin: 0, padding: 0, order: 0, width: '20rem'}}>
                <StatsAssigner 
                  increment={this.increment}
                  decrement={this.decrement}
                  stats={this.state.stats}
                  remainingPoints={this.state.remainingPoints}
                />
              </Container>
              <Container className={classes.fixed} style={{marginLeft: '1rem', padding: 0, order: 1, width: '18rem'}}>
                <PhysicalCharacteristics
                  stats={this.state.physical}
                  onChange={this.changePhysical}
                />
              </Container>
              
              <Container className={classes.grow} style={{marginLeft: '1rem', padding: 0, order: 2}}>
                <RPlikes />
              </Container>
              
            </Container>
          </form>
          <AvatarSelector 
            open={this.state.avatarSelecting}
            hideAvatar={this.closeAvatarChooser}
            submit={this.setAvatar}
          />
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(CharacterCreator);