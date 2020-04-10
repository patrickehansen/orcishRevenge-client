import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

import SkillContainer from './skillContainer';

class CharacterSkills extends Component {

  render() {
    const { index, value, character, classes } = this.props;
    const skills = character.Skills;

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
