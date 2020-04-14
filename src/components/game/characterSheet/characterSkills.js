import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { DragDropContext } from 'react-beautiful-dnd';
import { diff } from 'deep-diff';

import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

import editSkillSection from '../../../requests/character/skills/editSkillSection';

import SkillContainer from './skills/skillContainer';

class CharacterSkills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: props.character.Skills,
      waiting: false,
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const differences = diff(prevState.skills, this.props.character.Skills);

    if (differences) {
      if (this.state.waiting) {
        console.log('resetting waiting', prevState.waiting, this.state.waiting)
        this.setState({
          waiting: false,
          differences: differences
        })
      }else if (!this.state.differences || this.state.differences.length !== differences.length){
        this.setState({
          skills: this.props.character.Skills,
          waiting: false,
        })
      }
    }
  }

  onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const skills = this.props.character.Skills;

    

    if (type === 'skillSection') {
      const destinationHalf = destination.droppableId.slice(-1);
      const newPlacement = `${destinationHalf},${destination.index}`;

      const id = draggableId.split('_')[1];
      const found = skills.find(v => v._sectionid == id);

      found.Placement = newPlacement;

      //console.log('My new placement is:', newPlacement)
  
      this.setState({
        skills
      })
  
      await editSkillSection(found);
    }else if (type === 'skill') {
      //console.log('ok this is a skill', skills);
      const sourceId = source.droppableId.split('_')[1];
      const destinationId = destination.droppableId.split('_')[1]

      const sourceSection = skills.find(v => v._sectionid == sourceId);
      const destinationSection = skills.find(v => v._sectionid == destinationId);

      const skill = sourceSection.Skills[source.index];
      delete skill._id;

      sourceSection.Skills.splice(source.index, 1);

      destinationSection.Skills.splice(destination.index, 0, skill);

      console.log('New source', sourceSection, 'new destination', destinationSection)

      console.log(`Setting waiting as ${destinationSection._id !== sourceSection._id}`)
      this.setState({
        skills: skills,
        waiting: destinationSection._id !== sourceSection._id
      })

      if (destinationSection._id !== sourceSection._id) await editSkillSection(sourceSection);

      await editSkillSection(destinationSection);
    }


  }

  onAddSection = (section) => {
    const {skills} = this.state;
    skills.push(section);

    this.setState({
      skills: skills
    })
  }
  
  render() {
    const { index, value, classes } = this.props;
    const skills = this.state.skills;

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
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Grid container className={classes.characterSkills} spacing={1}>
            <SkillContainer sections={first} onAdd={this.onAdd} placement={0} onAddSection={this.onAddSection} />
            <SkillContainer sections={second} onAdd={this.onAdd} placement={1} onAddSection={this.onAddSection} />
          </Grid>
        </DragDropContext>
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
