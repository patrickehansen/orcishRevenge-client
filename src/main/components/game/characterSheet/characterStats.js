import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import ms from 'ms';

import RPLikes from '../characterSelection/RPlikes';
import StatAssigner from '../characterSelection/statsAssigner';
import { HorizontalFlex } from '../../primitives/layout';
import PhysicalTrait from './physicalTrait';
import styles from '../../style/styles';

import editCharacterStats from '../../../requests/character/editCharacterStats';
import editCharacterRP from '../../../requests/character/editCharacterRP';

class CharacterStats extends Component {
  constructor(props) {
    super(props);

    const { character } = this.props;

    this.state = {
      stats : {
        Strength: character.Strength,
        Agility: character.Agility,
        Endurance: character.Endurance,
        Reasoning: character.Reasoning,
        Speed: character.Speed,
        MagicAffinity: character.MagicalAffinity,
        Alertness: character.Alertness,
        Melee: character.Melee,
        Accuracy: character.Accuracy,
        HitPoints: character.HitPoints,
        MagicPoints: character.MagicPoints,
        ActionPoints: character.ActionPoints,
      },
      rpChanges: {},
      changed: false,
    };

    this.timer = setInterval(this.save, ms('30s'))
  }

  onRPBlur = (e) => {
    const { value, id} = e.target;
    const { character } = this.props;

    // I really don't like this nonsense.
    const index = id.slice(-1);
    const descIndex = id.indexOf('Desc');
    let type;

    if (descIndex) {
      type = id.slice(0, descIndex);
    }else{
      type = id.slice(0, -1);
    }

    const currentBlock = character[type + 's'][index - 1];
    let current = descIndex > -1 ? currentBlock.Description : currentBlock.Title;

    if (current !== value) {
      console.log('setting')
      const currentState = this.state.rpChanges;
      currentState[id] = value;

      this.setState({
        rpChanges: currentState,
        changed: true
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.save();
  }

  componentDidUpdate (prevProps) {
    console.log(this.props.index, prevProps.index, prevProps.value)
    if (this.props.value !== prevProps.value && prevProps.index === prevProps.value) {
      this.save();
    }
  }

  save = () => {
    //console.log('here in save', this.state.changed)
    if (this.state.changed) {
      editCharacterStats(this.state.stats, this.props.character._id);
      editCharacterRP(this.state.rpChanges, this.props.character._id);

      console.log('resetting')
      this.setState({
        changes: false
      })
    }
  }

  increment = (name, sub = 'Total') => {
    const current = this.state.stats;

    if (typeof current[name] === 'number') {
      current[name] += 0.1;
    }else{
      current[name][sub] += 1;
    }
    
    this.setState({
      stats: current,
      changed: true,
    })
  }

  decrement = (name, sub = 'Total') => {
    const current = this.state.stats;

    if (typeof current[name] === 'number') {
      current[name] -= 0.1;
    }else{
      current[name][sub] -= 1;
    }
    
    this.setState({
      stats: current,
      changed: true,
    })

  }

  render() {
    const {
      index, value, character, classes,
    } = this.props;
    if (index !== value) return null;

    return (
      <HorizontalFlex
        id={`simple-tabpanel-${index}`}
        className={`${classes.spaceBetween}`}
      >
       <div style={{ maxWidth: '30%', marginRight: '0.5rem' }}>
          <Typography
            variant='h5'
            style={{
              borderBottom: 'solid 1px black', maxWidth: '4rem', marginBottom: '0.2rem', textAlign: 'center',
            }}
          >
          Stats
          </Typography>
          <StatAssigner
            increment={this.increment}
            decrement={this.decrement}
            stats={this.state.stats}
            remainingPoints={character.assignablePoints || 0}
            context={'sheet'}
          />

        </div>
        <div className={`${classes.grow}`}>
          <Typography
            variant='h5'
            style={{
              borderBottom: 'solid 1px black', maxWidth: '12rem', marginBottom: '0.2rem', textAlign: 'center',
            }}
          >
            Personality Traits
          </Typography>
          <RPLikes
            onChangeBlur={this.onRPBlur}
            character={character}
          />

        </div>
        <div className={classes.physicalTraits}>
          <img className='characterAvatar' src={character.Avatar} style={{ maxWidth: '20rem' }}/>
          <Typography
            variant='h5'
            style={{
              borderBottom: 'solid 1px black', maxWidth: '12rem', marginBottom: '0.2rem', textAlign: 'center',
            }}
          >
            Physical Traits
          </Typography>
          <PhysicalTrait label='Height' value={character.Height} />
          <PhysicalTrait label='Weight' value={character.Weight} />
          <PhysicalTrait label='Build' value={character.Build} />
          <PhysicalTrait label='Age' value={character.Age} />
          <PhysicalTrait label='Hair' value={character.HairColor} />
          <PhysicalTrait label='Skin' value={character.SkinColor} />
          <PhysicalTrait label='Eyes' value={character.EyeColor} />
        </div>


      </HorizontalFlex>
    );
  }
}

CharacterStats.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
};


export default withStyles(styles)(CharacterStats);
