import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';


import SkillSection from './skillSection';

class SkillContainer extends Component {
  addSection = (e) => {
    //this.props.onAdd('section', this.props.placement)
  }


  render() {
    const { classes, sections } = this.props;

    
    return (
      <Grid 
        item 
        container 
        className={classes.skillsHalf} 
        direction='column'
        justify='space-between'
      >
        <Grid item className={classes.skillbox}>
        {
          sections.map((v,i) => (
            <SkillSection section={v} key={i} onAdd={this.props.onAdd}/>
          ))
        }
        </Grid>
        <Grid item>
          <Button 
            onClick={this.addSection} 
            className={classes.addSkillButton}
            variant='contained'
            color='primary'
            
          >
            +
          </Button>
        </Grid>
      </Grid>
    );
  }
}

SkillContainer.propTypes = {
  sections: PropTypes.array//.isRequired,
};


export default withStyles(styles)(SkillContainer);
