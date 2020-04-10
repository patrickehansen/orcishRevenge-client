import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

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
    }
  }

  deleteSkill = (skill) => {
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
    this.setState({
      editting: true,
      toEdit: skill,
    })
  }

  render() {
    const { classes, section } = this.props;
    
    return (
      <Paper elevation={2} className={classes.skillSection}>
        <NotchedOutline label={section.SectionName}>
          <VerticalFlex>
          {
            section.Skills.map((v,i) => (
              <Skill skill={v} key={i} onEdit={this.editSkill} />
            ))
          }
            <Button 
              onClick={this.addSkill} 
              className={classes.addSkillButton}
              variant='contained'
              color='primary'
            >
            +
            </Button>
          </VerticalFlex>
        </NotchedOutline>
        <SkillEditor 
          open={this.state.editting}
          skill={this.state.toEdit}
          onClose={this.closeEditor}
          onSave={this.saveSkill}
          onDelete={this.deleteSkill}
        />
      </Paper>
    );
  }
}

SkillSection.propTypes = {
  section: PropTypes.object//.isRequired,
};


export default withStyles(styles)(SkillSection);
