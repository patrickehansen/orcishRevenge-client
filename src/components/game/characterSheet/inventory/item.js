import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import styles from '../../../style/styles';

import { Draggable } from 'react-beautiful-dnd';

class Item extends Component {
  requestEdit = () => {
    console.log('requesting item edit', this.props.item);
    this.props.onEdit(this.props.item)
  }

  render() {
    const { classes, item } = this.props;

    const id = item['_id'] || item.Name;

    return (
      <Draggable
        type='item'
        draggableId={id}
        index={this.props.index}
        key={id}
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
                wrap='nowrap'
              >
              {
                typeof item.Quantity === 'number' &&
                <Grid item xs={3}>
                  {`QTY: ${item.Quantity}`}
                </Grid>
              }
                

                <Grid item xs={6}>
                  {item.Name}
                </Grid> 
      
                {
                  item.Armor &&
                  <Grid item xs={6}>
                    {item.Armor}
                  </Grid>
                }
                
                {item.Damage &&
                  <Grid item xs={3} >
                    {item.Damage}
                  </Grid>
                }
               
      
              </Grid>
            </Paper>
          </div>
         
        )}
      </Draggable>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object
};


export default withStyles(styles)(Item);
