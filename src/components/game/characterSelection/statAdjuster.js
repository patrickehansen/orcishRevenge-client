
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import {
  FaAngleDoubleUp, FaAngleDoubleDown, FaAngleUp, FaAngleDown,
} from 'react-icons/fa';

import { withStyles } from '@material-ui/styles';
import { ContainedButton as Button } from '../../primitives/button';

import styles from '../../style/styles';
import { VerticalFlex } from '../../primitives/layout';


const iconStyle = {
  position: 'absolute',
  color: 'white',
};

class StatAdjuster extends Component {
  state = {
    error: null,
  }

  render() {
    const {
      label, modifiers, classes, compact,
    } = this.props;
    let { value } = this.props;
    const type = typeof value;

    let reduced;

    if (type === 'object') {
      reduced = (modifiers || []).reduce((a, v) => {
        if (v.target === 'current') {
          a = { // eslint-disable-line no-param-reassign
            tooltipCurrent: `${a.tooltipCurrent} ${v.value > 0 ? '+' : ''}${v.value}(${v.source})`,
            value: {
              Current: a.value.Current + v.value,
              Total: a.value.Total,
            },
          };
        } else {
          a = { // eslint-disable-line no-param-reassign
            tooltipTotal: `${a.tooltipTotal} ${v.value > 0 ? '+' : ''}${v.value}(${v.source})`,
            value: {
              Current: a.value.Current,
              Total: a.value.Total + v.value,
            },
          };
        }

        return a;
      }, { tooltipCurrent: String(value.Current), tooltipTotal: String(value.Total), value });

      reduced.tooltip = `${reduced.tooltipCurrent} / ${reduced.tooltipTotal}`;
    } else {
      reduced = (modifiers || []).reduce((a, v) => ({
        tooltip: `${a.tooltip} ${v.value > 0 ? '+' : ''}${v.value}(${v.source})`,
        value: a.value + v.value,
      }), { tooltip: String(value), value });
    }

    const { tooltip } = reduced;
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
    );
  }
}

StatAdjuster.propTypes = {
  label: PropTypes.string.isRequired,
  modifiers: PropTypes.object,
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  compact: PropTypes.bool,
  name: PropTypes.string.isRequired,
  canIncrement: PropTypes.bool,
  canIncrementByWhole: PropTypes.bool,
  canIncrementByTenths: PropTypes.bool,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  canAdjust: PropTypes.bool.isRequired,
};

export default withStyles(styles)(StatAdjuster);
