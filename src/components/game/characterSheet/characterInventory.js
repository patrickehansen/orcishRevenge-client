import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { DragDropContext } from 'react-beautiful-dnd';
import { diff } from 'deep-diff';

import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

import editItemSection from '../../../requests/character/inventory/editItemSection';

import ItemContainer from './inventory/itemContainer';

class CharacterInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.character.Items,
      waiting: false,
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const differences = diff(prevState.items, this.props.character.Items);

    if (differences) {
      if (this.state.waiting) {
        this.setState({
          waiting: false,
          differences: differences
        })
      }else if (!this.state.differences || this.state.differences.length !== differences.length){
        this.setState({
          items: this.props.character.Items,
          waiting: false,
        })
      }
    }
  }

  onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;
    

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const items = this.props.character.Items;

    if (type === 'itemSection') {
      const destinationHalf = destination.droppableId.slice(-1);
      const newPlacement = `${destinationHalf},${destination.index}`;

      const id = draggableId.split('_')[1];
      const found = items.find(v => v._itemsectionid == id);

      found.Placement = newPlacement;

      this.setState({
        items
      })
  
      await editItemSection(found);
    }else if (type === 'item') {
      const sourceId = source.droppableId.split('_')[1];
      const destinationId = destination.droppableId.split('_')[1]

      const sourceSection = items.find(v => v._itemsectionid == sourceId);
      const destinationSection = items.find(v => v._itemsectionid == destinationId);

      const item = sourceSection.Items[source.index];
      delete item._id;


      sourceSection.Items.splice(source.index, 1);
      destinationSection.Items.splice(destination.index, 0, item);

      this.setState({
        items: items,
        waiting: destinationSection._id !== sourceSection._id
      })

      if (destinationSection._id !== sourceSection._id) await editItemSection(sourceSection);

      await editItemSection(destinationSection);
    }


  }

  onAddSection = (section) => {
    const {items} = this.state;
    items.push(section);

    this.setState({
      items: items
    })
  }
  
  render() {
    const { index, value, classes } = this.props;
    const items = this.state.items;

    const [first, second] = items.reduce((a, v) => {
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
            <ItemContainer sections={first} onAdd={this.onAdd} placement={0} onAddSection={this.onAddSection} />
            <ItemContainer sections={second} onAdd={this.onAdd} placement={1} onAddSection={this.onAddSection} />
          </Grid>
        </DragDropContext>
      </Container>
    );
  }
}

CharacterInventory.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharacterInventory);