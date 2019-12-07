import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import RPLikes from '../characterSelection/RPlikes';
import StatAssigner from '../characterSelection/statsAssigner';
import { HorizontalFlex } from '../../primitives/layout';
import PhysicalTrait from './physicalTrait';
import styles from '../../style/styles';

class CharacterStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: {

      },
    };
  }

  onRPChange = () => {

  }

  render() {
    const {
      index, value, character, classes,
    } = this.props;
    if (index !== value) return null;

    const stats = {
      Strength: character.Strength,
      Agility: character.Agility,
      Endurance: character.Endurance,
      Reasoning: character.Reasoning,
      Speed: character.Speed,
      MagicAffinity: character.MagicalAffinity,
      Alertness: character.Alertness,
      Melee: character.Melee,
      Accuracy: character.Accuracy,
      HitPoints: character.Health,
      MagicPoints: character.MagicPoints,
      ActionPoints: character.ActionPoints,
    };

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
            stats={stats}
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
            onChange={this.onRPChange}
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
