import React, {Component} from 'react';
import ImportTextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/styles';
import {styles} from '../style/styles';

export default TextField = withStyles(styles)(class TextField extends Component {
  render() {
    const {classes} = this.props;

    return (
      <ImportTextField
        id={this.props.id || 'textfield'}
        className={`${this.props.className} ${classes.textField}`}
        type="text"
        name={this.props.label.toLowerCase()}
        placeholder={this.props.label}
        label={this.props.label}
        autoFocus={this.props.autoFocus}
        required={this.props.required}
        fullWidth={this.props.fullWidth}
        color={this.props.color || 'secondary'}
      />
    )
  }
})

export const FilledTextField = withStyles(styles)(class FilledTextField extends Component {
  render() {
    const {classes} = this.props;

    return (
      <ImportTextField
        id={this.props.id || 'filled-textfield'}
        className={`${this.props.className} ${classes.filledTextField} ${classes.textField}`}
        type="text"
        name={this.props.label.toLowerCase()}
        placeholder={this.props.label}
        variant="filled"
        label={this.props.label}
        autoFocus={this.props.autoFocus}
        required={this.props.required}
        fullWidth={this.props.fullWidth}
        color={this.props.color || 'secondary'}
      />
    )
  }
})

export const OutlinedTextField = withStyles(styles)(class OutlinedTextField extends Component {
  render() {
    const {classes} = this.props;

    return (
      <ImportTextField
        id={this.props.id || 'outlined-textfield'}
        className={`${this.props.className} ${classes.filledTextField} ${classes.textField}`}
        type="text"
        name={this.props.label.toLowerCase()}
        variant="outlined"
        placeholder={this.props.label}
        label={this.props.label}
        autoFocus={this.props.autoFocus}
        required={this.props.required}
        fullWidth={this.props.fullWidth}
        color={this.props.color || 'secondary'}
      />
    )
  }
})

export const MultiTextField = withStyles(styles)(class MultiTextField extends Component {
  render() {
    const {classes} = this.props;

    return (
      <ImportTextField
        id={this.props.id}
        className={`${this.props.className} ${classes.filledTextField} ${classes.textField}`}
        type="text"
        rowsMax={this.props.rowsMax}
        multiline
        name={this.props.label.toLowerCase()}
        placeholder={this.props.label}
        label={this.props.label}
        autoFocus={this.props.autoFocus}
        required={this.props.required}
        fullWidth={this.props.fullWidth}
        color={this.props.color || 'secondary'}
      />
    )
  }
})