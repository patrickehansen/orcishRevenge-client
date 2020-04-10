import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

import Confirm from '../../util/confirm';

import SkillEditor from './skillEditor';
import VerticalFlex from '../../primitives/layout/verticalFlex';
import Skill from './skill';
import NotchedOutline from '../../primitives/layout/notchedOutline';

import createSkill from '../../../requests/character/addSkill';
import editSkill from '../../../requests/character/editSkill';
import deleteSkill from '../../../requests/character/deleteSkill';

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

  render() {
    const { classes, section } = this.props;
    
    return (
      <Paper elevation={2} className={classes.skillSection}>
        <NotchedOutline 
          label={section ? section.SectionName : null}
          canRelabel={true}
          onRelabel={this.rename}
          onCancelRelabel={this.props.onCancelRelabel}
        >
          <VerticalFlex>
          {
            section && section.Skills.map((v,i) => (
              <Skill skill={v} key={i} onEdit={this.editSkill} />
            ))
          }
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
          </VerticalFlex>
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
    );
  }
}

SkillSection.propTypes = {
  section: PropTypes.object//.isRequired,
};

export default withStyles(styles)(SkillSection);