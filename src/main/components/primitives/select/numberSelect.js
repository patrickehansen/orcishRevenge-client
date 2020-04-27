import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

function NumberSelect(props) {
  const { classes } = props;

  return (
    <TextField
      id={props.id}
      type='number'
      label={props.label}
      className={`${props.className} ${classes.numberSelect} ${classes.select}`}
      InputLabelProps={{
        shrink: true,
      }}
      value={props.value}
      inputProps={{
        step: props.step || 1,
      }}
      onChange={(e) => { props.onChange(props.id, e); }}
      helperText={props.helperText}
      margin='normal'
      variant='outlined'
    />
  );
}

NumberSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  step: PropTypes.number,
};


export default withStyles(styles)(NumberSelect);
