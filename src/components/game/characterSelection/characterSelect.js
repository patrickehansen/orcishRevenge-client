
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import { ContainedButton as Button } from '../../primitives/button';

import GetAvailableCharacters from '../../../requests/character/availableCharacters';
import PossessCharacter from '../../../requests/character/possessCharacter';

import CharacterCreator from './characterCreator';
import CharacterCard from './characterCard';

import { VerticalFlex } from '../../primitives/layout';

import ErrorComponent from '../../util/error';
import styles from '../../style/styles';

class CharacterSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      creating: false,
    };
  }

  componentDidMount() {
    GetAvailableCharacters();
  }

  createCharacter = (e) => {
    e.preventDefault();

    this.setState({
      creating: true,
    });
  }

  closeCreator = () => {
    this.setState({
      creating: false,
    });
  }

  play = async () => {
    await PossessCharacter(this.state.selected.id);

    this.props.close();
  }

  characterSelected = (name, id) => {
    this.setState({
      selected: {
        name, id,
      },
    });
  }

  render() {
    const characters = [...this.props.availableCharacters];
    characters.push({
      _id: 'spectator',
      Name: 'Spectator',
      Avatar: 'https://imgur.com/hxrMCCD.png',
    });

    if (this.props.canBeGM) {
      characters.push({
        _id: 'gm',
        Name: 'GM',
        Avatar: 'https://imgur.com/mqii5iw.png',
      });
    }

    const { classes } = this.props;

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.close}
      >
        <VerticalFlex className={classes.characterSelect} id='characterSelectModal'>
          <VerticalFlex className={`${classes.characterContainer} ${classes.grow} characterContainer`}>
            <Grid container spacing={2} justify='center' className={classes.grow}>
            {
              characters.map((v, i) => {
                const active = this.state.selected ? this.state.selected.name === v.Name : false;

                return (
                  <Grid item key={i} >
                    <CharacterCard character={v} onSelect={this.characterSelected} active={active}/>
                  </Grid>

                );
              })
            }
            </Grid>
            {
              this.state.selected && <div className={`${classes.fixed} ${classes.centered}`}>
              <Button
                id='createNewBtn'
                onClick={this.play}
              >
                Play as {this.state.selected.name}
              </Button>
            </div>
            }

          </VerticalFlex>

          <div className={`${classes.centered} `}>
            <Button
              onClick={this.createCharacter}
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
    );
  }
}

CharacterSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  availableCharacters: PropTypes.array,
  canBeGM: PropTypes.bool,
  open: PropTypes.object.isRequired,
  close: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  availableCharacters: state.account.availableCharacters,
  canBeGM: state.account.IsGM,
});

export default connect(mapStateToProps)(withStyles(styles)(CharacterSelect));
