'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import {FaAngleDoubleUp, FaAngleDoubleDown, FaAngleUp, FaAngleDown} from 'react-icons/fa'

import Button from '../../primitives/button';

import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';
import { VerticalFlex } from '../../primitives/layout';


const iconStyle = {
  position: 'absolute',
  color: 'white'
}

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    }
  }
 
  render() {
    let {label, modifiers, value, classes, compact} = this.props;
    const type = typeof value;

    let reduced;

    if (type === 'object') {
      reduced = (modifiers || []).reduce((a, v) => {
        if (v.target == 'current') {
          a = {
            tooltipCurrent: `${a.tooltipCurrent} ${v.value > 0 ? '+' : ''}${v.value}(${v.source})`,
            value: {
              Current: a.value.Current + v.value,
              Total: a.value.Total, 
            }
          }
        }else{
          a = {
            tooltipTotal: `${a.tooltipTotal} ${v.value > 0 ? '+' : ''}${v.value}(${v.source})`,
            value: {
              Current: a.value.Current,
              Total: a.value.Total + v.value, 
            }
          }
        }

        return a;
      }, {tooltipCurrent: String(value.Current), tooltipTotal: String(value.Total), value: value});

      reduced.tooltip = `${reduced.tooltipCurrent} / ${reduced.tooltipTotal}`;
    }else{
      reduced = (modifiers || []).reduce((a, v) => {
        return {
          tooltip: `${a.tooltip} ${v.value > 0 ? '+' : ''}${v.value}(${v.source})`,
          value: a.value + v.value,
        }
      }, {tooltip: String(value), value: value});
    }
    
    let tooltip = reduced.tooltip;
    value = reduced.value;

    return (
      <Card className={compact ? classes.statAdjusterCompact : classes.statAdjuster}>
        <CardContent className={`${classes.horizontalTextContainer} ${classes.cardContent}`}>
          <Typography variant='h6' className={compact ? classes.statLabelCompact : classes.statLabel} component='span'>
            {label}
          </Typography>
          {
            type !== 'object' ? (
              <Tooltip TransitionComponent={Zoom} title={tooltip}>
                <Typography variant='h6' className={classes.statValue} component='span'>
                  {value % 1 > 0 ? value.toFixed(1) : value}
                </Typography>
              </Tooltip>
            ) : (
              <Tooltip TransitionComponent={Zoom} title={tooltip}>
                <Typography variant='h6' className={classes.statValue} component='span'>
                  {value.Current} / {value.Total}
                </Typography>
              </Tooltip>
            )
          }
        </CardContent>
        {
          (this.props.canAdjust && type !== 'object') && (
            <CardActions className={`${classes.horizontalFlex} ${classes.noPadding}`} disableSpacing={true}>
              { this.props.canIncrementByWhole && (
                  <VerticalFlex>
                    <Button
                      size='small'
                      className={classes.statModifier}
                      disabled={!this.props.canIncrement || this.props.name === 'MagicAffinity'}
                      onClick={() => this.props.increment(this.props.name)}
                    >
                      <FaAngleDoubleUp style={iconStyle} />
                    </Button>
                    <Button
                      size='small'
                      className={classes.statModifier}
                      disabled={this.props.value <= 6 || this.props.name === 'MagicAffinity'}
                      onClick={() => this.props.decrement(this.props.name)}
                    >
                      <FaAngleDoubleDown style={iconStyle}/>
                    </Button>
                  </VerticalFlex>
                )
              }
              {
                this.props.canIncrementByTenths && (
                  <VerticalFlex>
                    <Button
                      size='small'
                      className={classes.statModifier}
                      disabled={!this.props.canIncrement || this.props.name === 'MagicAffinity'}
                      onClick={() => this.props.increment(this.props.name)}
                    >
                      <FaAngleUp style={iconStyle}/>
                    </Button>
                    <Button
                      size='small'
                      className={classes.statModifier}
                      disabled={this.props.value <= 6 || this.props.name === 'MagicAffinity'}
                      onClick={() => this.props.decrement(this.props.name)}
                    >
                      <FaAngleDown style={iconStyle}/>
                    </Button>
                  </VerticalFlex>
                )
              }
              
            </CardActions>
          )
        }
      </Card>
    )
  }
}

export default withStyles(styles)(Character);