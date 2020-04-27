import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteForever from '@material-ui/icons/DeleteForever';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/styles';
import styles from '../../../style/styles';

import Confirm from '../../../util/confirm';

import ItemEditor from './itemEditor';
import VerticalFlex from '../../../primitives/layout/verticalFlex';
import Item from './item';
import NotchedOutline from '../../../primitives/layout/notchedOutline';

import createItem from '../../../../requests/character/inventory/addItem';
import editItem from '../../../../requests/character/inventory/editItem';
import deleteItem from '../../../../requests/character/inventory/deleteItem';

class ItemSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editting: false,
      toEdit: null,
      renaming : false,
      deleting: false,
    }
  }

  deleteItem = (item) => {
    item.SectionID = this.props.section['_id'];

    deleteItem(item);

    this.closeEditor();
  }

  closeEditor = () => {
    this.setState({
      editting: false,
      toEdit: null,
    })
  }

  saveItem = async (item) => {
    item.SectionID = this.props.section['_id'];

    if (this.state.toEdit) {
      await editItem(item);
    }else{
      await createItem(item);
    }

    this.setState({
      editting: false,
      toEdit: null,
    })
  }

  addItem = (e) => {
    this.setState({
      editting: true
    })
  }

  editItem = (item) => {
    this.setState({
      editting: true,
      toEdit: item,
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

    let dragId = 'itemSection_';

    if (section && section._itemsectionid) {
      dragId += `${section._itemsectionid}`;
    }

    return (
      <Draggable draggableId={dragId} index={this.props.index} type='itemSection'>
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
                  type='item'
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
                      section && section.Items.map((v,i) => (
                        <Item item={v} key={i} onEdit={this.editItem} index={i} />
                      ))
                    }
                    
                    </VerticalFlex>
                    {provided.placeholder}
                  </div>
                )}
                </Droppable>
              
                {
                  section && 
                  <Button 
                    onClick={this.addItem} 
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
              <ItemEditor 
                open={this.state.editting}
                item={this.state.toEdit}
                onClose={this.closeEditor}
                onSave={this.saveItem}
                onDelete={this.deleteItem}
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

ItemSection.propTypes = {
  section: PropTypes.object//.isRequired,
};

export default withStyles(styles)(ItemSection);