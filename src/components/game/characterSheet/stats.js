import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import RPLikes from '../characterSelection/RPlikes';
import StatDisplay from './statDisplay';
import PhysicalTrait from './physicalTrait';
import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';

class Stats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editable: {

      }
    }
  }

  onRPChange = (e) => {

  }

  render() {
    const {index, value, character, classes} = this.props;
    if (index !== value) return null

    return (
      <Container 
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className={`${classes.horizontalFlex} ${classes.spaceBetween}`}
      >
       <div style={{maxWidth: '30%'}}>
        <Typography
          variant='h5'
          style={{borderBottom: 'solid 1px black', maxWidth: '4rem', marginBottom: '0.2rem', textAlign: 'center'}}
        >
        Stats
        </Typography>
          <StatDisplay label='STR' value={character.Strength} bonus = {2} />
          <StatDisplay label='AGI' value={character.Agility} bonus = {1} />
          <StatDisplay label='END' value={character.Endurance} bonus = {2} />
          <StatDisplay label='RES' value={character.Reasoning} bonus = {2} />
          <StatDisplay label='SPD' value={character.Speed} bonus = {2} />
          <StatDisplay label='MAF' value={character.MagicalAffinity} bonus = {-2} />
          <StatDisplay label='ALT' value={character.Alertness} bonus = {1} />
          <StatDisplay label='MEL' value={character.Melee} bonus = {0} />
          <StatDisplay label='ACC' value={character.Alertness} bonus = {2} />
          <StatDisplay label='HP' value={character.Health} bonus = {0} />
          <StatDisplay label='MP' value={character.MagicPoints} bonus = {0} />
          <StatDisplay label='AP' value={character.ActionPoints} bonus = {0} />
        </div>
        <div style={{maxWidth: '30%', marginLeft: '0.5rem'}}>
          <Typography
            variant='h5'
            style={{borderBottom: 'solid 1px black', maxWidth: '12rem', marginBottom: '0.2rem', textAlign: 'center'}}
          >
            Personality Traits
          </Typography>
          <RPLikes
            onChange={this.onRPChange}
            character={character}
          />
          
        </div>
        <div style={{maxWidth: '30%'}}>
          <img className='characterAvatar' src={character.Avatar} style={{maxWidth: '20rem'}}/>
          <Typography
            variant='h5'
            style={{borderBottom: 'solid 1px black', maxWidth: '12rem', marginBottom: '0.2rem', textAlign: 'center'}}
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
        

      </Container>  
    )
  }
}

export default withStyles(styles)(Stats);