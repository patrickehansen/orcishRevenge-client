import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

class Skill extends Component {
  render() {
    const { classes, skill } = this.props;

    return (
      <Paper
        className={classes.skill} 
      >
      <Grid 
          container 
          spacing={0}
          direction='row' 
          justify='space-between'
        >
          <Grid item xs={3}>
          {skill.Name}
          </Grid> 

          <Grid item xs={1}>
            {skill.MPCost && skill.MPCost+'MP'}
          </Grid>

          <Grid item xs={1}>
          {skill.APCost && skill.MPCost+'AP'}
          </Grid>

          
          <Grid item xs={1} >
            {skill.Damage && skill.Damage}
          </Grid>

          
          <Grid item xs={1}>
            {skill.Score && skill.Score}
          </Grid>
        </Grid>
      </Paper>
        
    );
  }
}

Skill.propTypes = {

};


export default withStyles(styles)(Skill);
