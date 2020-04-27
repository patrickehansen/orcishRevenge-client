import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Droppable } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/styles';


import styles from '../../../style/styles';


import ItemSection from './itemSection';

import editItemSection from '../../../../requests/character/inventory/editItemSection';
import addItemSection from '../../../../requests/character/inventory/addItemSection';
import deleteItemSection from '../../../../requests/character/inventory/deleteItemSection';

class ItemContainer extends Component {
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
    section.Items = [];

    console.log('addition confirmed', section);

    this.props.onAddSection(section);
    await addItemSection(section);
  }

  relabelSection = async (section) => {
    console.log('relabel', section)
    await editItemSection(section);

    console.log('editting item section', this.state.adding)

    if (this.state.adding) this.cancelAdd();
  }

  deleteSection = (section) => {
    console.log('deleting section', section);
    deleteItemSection(section);
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
        <Droppable droppableId={`itemContainer_${this.props.placement}`} type='itemSection'>
          {(provided) => (
            <Grid 
              {...provided.droppableProps}
              ref={provided.innerRef}
              item 
              className={classes.skillbox}
            >
            {
              sections.map((v,i) => (
                <ItemSection 
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
                <ItemSection 
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

ItemContainer.propTypes = {
  sections: PropTypes.array//.isRequired,
};


export default withStyles(styles)(ItemContainer);
