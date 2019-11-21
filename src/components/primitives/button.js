import React, { Component } from 'react';
import ImportButton from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';

import {styles} from '../style/styles';

export default withStyles(styles)(class Button extends Component {
  render() {
    const {classes} = this.props;

    return (
      <ImportButton 
        className={`${this.props.className} ${classes.button}`}
        variant='contained'
        color={this.props.color || 'primary'}
        type={this.props.type || 'button'}
        fullWidth={this.props.fullWidth}
        onClick={this.props.onClick}
        id={this.props.id}
        size={this.props.size}
        width={this.props.width}
        disabled={this.props.disabled}
      >
      {this.props.children}
      </ImportButton>
    )
  }
})

export const TextButton = withStyles(styles)(class TextButton extends Component {
  render() {
    const {classes} = this.props;
    return (
      <ImportButton 
        className={`${this.props.className} ${classes.button} ${classes.textButton}`}
        color={this.props.color || 'primary'}
        type={this.props.type || 'button'}
        fullWidth={this.props.fullWidth}
        onClick={this.props.onClick}
        id={this.props.id}
        size={this.props.size}
        width={this.props.width}
        disabled={this.props.disabled}
      >
      {this.props.children}
      </ImportButton>
    )
  }
})
