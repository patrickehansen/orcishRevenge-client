import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/styles';
import {styles} from '../style/styles';

export default Select = withStyles(styles)(class Select extends Component {
  render() {
    const {classes} = this.props;

    return (
      <TextField
        id={this.props.id || 'select'}
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
        fullWidth={this.props.fullWidth}
        color={this.props.color || 'secondary'}
      >
        {this.props.options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
  }
})

export const OutlinedSelect = withStyles(styles)(class OutlinedSelect extends Component {
  render() {
    return (
      <TextField
        id={this.props.id || 'outlined-select'}
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
        variant="outlined"
        fullWidth={this.props.fullWidth}
        color={this.props.color || 'secondary'}
      >
        {this.props.options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
  }
})

export const FilledSelect = withStyles(styles)(class FilledSelect extends Component {
  render() {
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
        {props.options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
  }
})