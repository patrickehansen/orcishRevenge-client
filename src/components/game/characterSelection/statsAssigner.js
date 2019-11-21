'use strict';
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/styles';
import StatAdjuster from './statAdjuster';
import {styles} from '../../style/styles';

const labels = {
  Strength: 'STR',
  Agility: 'AGI',
  Endurance: 'END',
  Reasoning: 'RES',
  Speed: 'SPD',
  MagicAffinity: 'MAG',
  Alertness: 'ALT',
  Melee: 'MEL',
  Accuracy: 'ACC',
  HitPoints: 'HP',
  MagicPoints: 'MP',
  ActionPoints: 'AP'
}

class StatsAssigner extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {classes} = this.props;

    return (
      <Container
        component='div'
        id='statsAssignment'
        className={classes.statsAssignment}
      >
        <Container id='statsTable' className={classes.statList}>
        {
          Object.entries(this.props.stats).map(([key, value]) => {
            return( 
              <StatAdjuster 
                name={key} 
                key={key}
                label={labels[key]}
                value={value} 
                increment={this.props.increment}
                decrement={this.props.decrement}
                canAdjust={this.props.remainingPoints > 0 || this.props.GM}
                canIncrement={this.props.remainingPoints > 0 && (value < 20 || key === 'Strength' && value < 25)}
                canIncrementByWhole={true}
                canIncrementByTenths={false}
                compact={this.props.context === 'sheet'}
              />
            )
          })
        }
        </Container>
        {
          this.props.context !== 'sheet' && (
            <Container id='statsFooter' className={classes.statFooter}>
              <span id='remainingLabel'>Remaining: </span>
              <span className={classes.remainingPoints}>{this.props.remainingPoints}</span>
            </Container>
          )
        }
        
      </Container>
    )
  }
}

export default withStyles(styles)(StatsAssigner);