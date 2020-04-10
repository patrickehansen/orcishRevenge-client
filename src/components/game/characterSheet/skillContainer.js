import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';


import SkillSection from './skillSection';

import editSkillSection from '../../../requests/character/editSkillSection';
import addSkillSection from '../../../requests/character/addSkillSection';
import deleteSkillSection from '../../../requests/character/deleteSkillSection';

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
    section.Placement = `${this.props.placement},${this.props.sections.length}`
    console.log('addition confirmed', section)
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
            <SkillSection section={v} key={i} onRelabel={this.relabelSection} onDeleteSection={this.deleteSection}/>
          ))
        }
        {
          this.state.adding && 
            <SkillSection section={null} onRelabel={this.confirmAddition} onCancelRelabel={this.cancelAdd}/>
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
