import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { HorizontalFlex } from '../../primitives/layout';
import styles from '../../style/styles';

class TraitDisplay extends Component {
  render() {
    const { label, value, classes } = this.props;

    return (
      <HorizontalFlex className={`${classes.physicalTrait}`} style={{ marginBottom: '0.2rem' }}>
        <Typography className={classes.traitLabel}>
          {label}:
        </Typography>

        <Typography className={classes.traitValue}>
          {value}
        </Typography>

      </HorizontalFlex>
    );
  }
}

TraitDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
};


export default withStyles(styles)(TraitDisplay);
