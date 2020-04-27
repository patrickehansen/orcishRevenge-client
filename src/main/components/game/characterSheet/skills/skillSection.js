import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteForever from '@material-ui/icons/DeleteForever';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/styles';
import styles from '../../../style/styles';

import Confirm from '../../../util/confirm';

import SkillEditor from './skillEditor';
import VerticalFlex from '../../../primitives/layout/verticalFlex';
import Skill from './skill';
import NotchedOutline from '../../../primitives/layout/notchedOutline';

import createSkill from '../../../../requests/character/skills/addSkill';
import editSkill from '../../../../requests/character/skills/editSkill';
import deleteSkill from '../../../../requests/character/skills/deleteSkill';

class SkillSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editting: false,
      toEdit: null,
      renaming : false,
      deleting: false,
    }
  }

  deleteSkill = (skill) => {
    skill.SectionID = this.props.section['_id'];

    console.log(skill, this.props.section)
    deleteSkill(skill);

    this.closeEditor();
  }

  closeEditor = () => {
    this.setState({
      editting: false,
      toEdit: null,
    })
  }

  saveSkill = async (skill) => {
    skill.SectionID = this.props.section['_id'];

    if (this.state.toEdit) {
      await editSkill(skill);
    }else{
      console.log('Adding skill', skill, this.props.section)
      await createSkill(skill);
    }

    this.setState({
      editting: false,
      toEdit: null,
    })
  }

  addSkill = (e) => {
    this.setState({
      editting: true
    })
  }

  editSkill = (skill) => {
    console.log('hi. edit skill here', skill)
    this.setState({
      editting: true,
      toEdit: skill,
    })
  }

  rename = (name) => {
    this.props.onRelabel({
      ...this.props.section,
      SectionName: name,
    });
  }

  promptDelete = () => {
    this.setState({
      deleting: true,
    })
  }

  cancelDelete = () => {
    this.setState({
      deleting: false,
    })
  }

  confirmDelete = () => {
    this.props.onDeleteSection(this.props.section);

    this.cancelDelete();
  }

  // <Droppable droppableId={section._id} type='skill'>
  //             {(provided) => (
  //               <VerticalFlex
  //                 {...provided.droppableProps}
  //                 ref={provided.innerRef}
  //               >
  //               {
  //                 section && section.Skills.map((v,i) => (
  //                   <Skill skill={v} key={i} onEdit={this.editSkill} index={i} />
  //                 ))
  //               }
  //               {provided.placeholder}
  //               </VerticalFlex>
  //             )}
  //             </Droppable>

  render() {
    const { classes, section } = this.props;

    let dragId = 'skillSection_';

    if (section && section._sectionid) {
      dragId += `${section._sectionid}`;
    }

    //console.log('section render', section)

    return (
      <Draggable draggableId={dragId} index={this.props.index} type='skillSection'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Paper 
              elevation={2} 
              className={classes.skillSection}
            >
              <NotchedOutline 
                label={section ? section.SectionName : null}
                canRelabel={true}
                onRelabel={this.rename}
                onCancelRelabel={this.props.onCancelRelabel}
                dragHandleProps={provided.dragHandleProps}
              >
                <Droppable 
                  droppableId={dragId} 
                  type='skill'
                  isDropDisabled={!section}
                >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{minHeight: '1rem'}}
                  >
                    <VerticalFlex>
                    {
                      section && section.Skills.map((v,i) => (
                        <Skill skill={v} key={i} onEdit={this.editSkill} index={i} />
                      ))
                    }
                    {provided.placeholder}
                    </VerticalFlex>
                  </div>
                )}
                </Droppable>
              
                {
                  section && 
                  <Button 
                    onClick={this.addSkill} 
                    className={classes.addSkillButton}
                    variant='contained'
                    color='primary'
                  >
                  +
                  </Button>
                }
                {
                  section && 
                  <Button
                    className={classes.skillSectionDelete}
                    onClick={this.promptDelete}
                  > 
                    <DeleteForever />
                  </Button>
                }
              </NotchedOutline>
              <SkillEditor 
                open={this.state.editting}
                skill={this.state.toEdit}
                onClose={this.closeEditor}
                onSave={this.saveSkill}
                onDelete={this.deleteSkill}
              />
              <Confirm 
                open={this.state.deleting}
                cancel={this.cancelDelete}
                confirm={this.confirmDelete}
              />
            </Paper>
          </div>
          
        )}
      </Draggable>
    );
  }
}

SkillSection.propTypes = {
  section: PropTypes.object//.isRequired,
};

export default withStyles(styles)(SkillSection);