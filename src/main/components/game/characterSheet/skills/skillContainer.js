import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Droppable } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/styles';


import styles from '../../../style/styles';


import SkillSection from './skillSection';

import editSkillSection from '../../../../requests/character/skills/editSkillSection';
import addSkillSection from '../../../../requests/character/skills/addSkillSection';
import deleteSkillSection from '../../../../requests/character/skills/deleteSkillSection';

class SkillContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adding : false,
    }
  }

  addSection = (e) => {
    this.setState({adding: true})
  }

  cancelAdd = () => {
    this.setState({adding: false});
  }

  confirmAddition = async (section) => {
    section.Placement = `${this.props.placement},${this.props.sections.length}`;
    section.Skills = [];

    console.log('addition confirmed', section);

    this.props.onAddSection(section);
    await addSkillSection(section);
  }

  relabelSection = async (section) => {
    console.log('relabel', section)
    await editSkillSection(section);

    console.log('editting skill section', this.state.adding)

    if (this.state.adding) this.cancelAdd();
  }

  deleteSection = (section) => {
    console.log('deleting section', section);
    deleteSkillSection(section);
  }

  render() {
    const { classes, sections } = this.props;
    
    //console.log('container', sections)
    return (
      <Grid 
        item 
        container 
        className={classes.skillsHalf} 
        direction='column'
        justify='space-between'
      >
        <Droppable droppableId={`skillContainer_${this.props.placement}`} type='skillSection'>
          {(provided) => (
            <Grid 
              {...provided.droppableProps}
              ref={provided.innerRef}
              item 
              className={classes.skillbox}
            >
            {
              sections.map((v,i) => (
                <SkillSection 
                  section={v} 
                  key={i} 
                  onRelabel={this.relabelSection} 
                  onDeleteSection={this.deleteSection}
                  index={i}
                />
              ))
            }
            {
              this.state.adding && 
                <SkillSection 
                  section={null} 
                  onRelabel={this.confirmAddition} 
                  onCancelRelabel={this.cancelAdd} 
                  index={-1}
                />
            }
            {provided.placeholder}
            </Grid>
          )}
        
        </Droppable>
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
