import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

import { Draggable } from 'react-beautiful-dnd';

class Skill extends Component {
  requestEdit = () => {
    console.log('requesting edit', this.props.skill);
    this.props.onEdit(this.props.skill)
  }

  render() {
    const { classes, skill } = this.props;

    //console.log(`skill, ${skill}, ${this.props.index}`)
    return (
      <Draggable
        type='skill'
        draggableId={skill._id || skill.Name}
        index={this.props.index}
      >
        {(provided) => (
          <div
            className={classes.skillHandle} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Paper
              className={classes.skill} 
              onDoubleClick={this.requestEdit}
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
                {skill.APCost && skill.APCost+'AP'}
                </Grid>
      
                
                <Grid item xs={1} >
                  {skill.Damage && skill.Damage}
                </Grid>
      
                
                <Grid item xs={1}>
                  {skill.Score && skill.Score}
                </Grid>
              </Grid>
            </Paper>
          </div>
         
        )}
      </Draggable>
    );
  }
}

Skill.propTypes = {
  skill: PropTypes.object
};


export default withStyles(styles)(Skill);
