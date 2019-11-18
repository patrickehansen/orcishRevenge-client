'use strict';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import {styles} from '../style/styles';


export const HorizontalFlex = withStyles(styles)(class HorizontalFlex extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Container
        className={`${this.props.className} ${classes.horizontalFlex}`}
        id={this.props.id}
      >
        {this.props.children}
      </Container>
    )
  }
})

export const VerticalFlex = withStyles(styles)(class VerticalFlex extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Container
        className={`${this.props.className} ${classes.verticalFlex}`}
        id={this.props.id}
      >
        {this.props.children}
      </Container>
    )
  }
})