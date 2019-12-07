import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';

class FilledSelect extends Component {
  render() {
    const { classes } = this.props;

    return (
      <TextField
        id={this.props.id || 'filled-select'}
        select
        label={this.props.label}
        className={`${this.props.className} ${classes.select}`}
        value={this.props.value}
        onChange={this.props.onChange}
        SelectProps={{
          MenuProps: {
            className: classes.option,
          },
        }}
        helperText={this.props.helperText}
        margin="normal"
        variant="filled"
        fullWidth={this.props.fullWidth}
        color={this.props.color || 'secondary'}
      >
        {this.props.options.map((option, index) => (
          <MenuItem key={index} value={option.value || option}>
            {option.label || option}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

FilledSelect.propTypes = {
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
};

export default withStyles(styles)(FilledSelect);
