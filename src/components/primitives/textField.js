import React, {Component} from 'react';
import ImportTextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/styles';
import {styles} from '../style/styles';

function reduceProps(props) {
  return Object.keys(props).reduce((a,v) => {
    if (v !== 'classes') {
      a[v] = props[v];
    }

    return a;
  }, {})
}

export default withStyles(styles)((props) => {
  const {classes} = props;
  const myProps = reduceProps(props);

  return (
    <ImportTextField
      {...myProps}
      id={props.id || 'textfield'}
      className={`${props.className} ${classes.textField}`}
      type="text"
      name={props.name || props.label.toLowerCase()}
      placeholder={props.placeholder || props.label}
      color={props.color || 'secondary'}
    />
  )
})

export const FilledTextField = withStyles(styles)(class FilledTextField extends Component {
  render() {
    const {classes} = props;
    const myProps = reduceProps(props);
  
    return (
      <ImportTextField
        {...myProps}
        id={this.props.id || 'filled-textfield'}
        className={`${this.props.className} ${classes.filledTextField} ${classes.textField}`}
        type="text"
        name={this.props.name || this.props.label.toLowerCase()}
        placeholder={this.props.placeholder || this.props.label}
        variant="filled"
        color={this.props.color || 'secondary'}
      />
    )
  }
})

export const OutlinedTextField = withStyles(styles)(class OutlinedTextField extends Component {
  render() {
    const {classes} = props;
    const myProps = reduceProps(props);
  
    return (
      <ImportTextField
        {...myProps}
        id={this.props.id || 'outlined-textfield'}
        className={`${this.props.className} ${classes.outlinedTextField} ${classes.textField}`}
        type="text"
        name={this.props.name || this.props.label.toLowerCase()}
        placeholder={this.props.placeholder || this.props.label}
        name={this.props.label.toLowerCase()}
        variant="outlined"
        color={this.props.color || 'secondary'}
      />
    )
  }
})

export const MultiTextField = withStyles(styles)(class MultiTextField extends Component {
  render() {
    const {classes} = props;
    const myProps = reduceProps(props);
  
    return (
      <ImportTextField
        {...myProps}
        id={this.props.id || 'outlined-textfield'}
        className={`${this.props.className} ${classes.multilineTextField} ${classes.textField}`}
        type="text"
        multiline
        name={this.props.name || this.props.label.toLowerCase()}
        placeholder={this.props.placeholder || this.props.label}
        name={this.props.label.toLowerCase()}
        color={this.props.color || 'secondary'}
      />
    )
  }
})