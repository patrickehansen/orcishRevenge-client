import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

import SkillContainer from './skillContainer';

import AddSkill from '../../../requests/character/addSkill';
import AddSkillSection from '../../../requests/character/AddSkillSection';

class CharacterSkills extends Component {
  onAdd = async (type, data) => {
    console.log('add', type, data)
    if (type === 'skill') {
      await AddSkill(data, this.props.character['_characterid']);
    }else if (type === 'section') {
      await AddSkillSection(data, this.props.character['_characterid']);
    }
  }

  render() {
    const { index, value, character, classes } = this.props;
    //const skills = character.Skills;

    const skills = [
      {
        SectionName: 'Testing',
        Placement: '0,0',
        Skills: [
          {
            Name: 'Singing',
            Score: 9.2,
          },
          {
            Name: 'Whittling',
            Score: 29.7,
          },
        ]
      },
      {
        SectionName: 'Spells',
        Placement: '1,0',
        Skills: [
          {
            Name: 'Ice Lance',
            MPCost: 8,
            APCost: 10,
            Damage: '4d12+4',
          },
          {
            Name: 'Lightning Bolt',
            MPCost: 12,
            APCost: 20,
            Damage: '4d8',
          },
          {
            Name: 'Flash',
            MPCost: 5,
          }
        ]
      },
      {
        SectionName: 'Trade Skills',
        Placement: '0,1',
        Skills: [
          {
            Name: 'Coopering',
            Score: '10.4',
          }
        ]
      }
    ]

    const [first, second] = skills.reduce((a, v) => {
      a[v.Placement.split(',')[0]].push(v)

      return a;
    }, [[],[]]);

   
    // Move this out.
    const sorter = (a,b) => {
      const ap = a.Placement.split(',')[1];
      const bp = b.Placement.split(',')[1];

      if (ap > bp) return 1;
      if (ap < bp) return -1;
      return 0;
    }

    first.sort(sorter);
    second.sort(sorter);

    return (
      <Container role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Grid container className={classes.characterSkills} spacing={1}>
          <SkillContainer sections={first} onAdd={this.onAdd} placement={0}/>
          <SkillContainer sections={second} onAdd={this.onAdd} placement={1}/>
        </Grid>
      </Container>
    );
  }
}

CharacterSkills.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
};


export default withStyles(styles)(CharacterSkills);
