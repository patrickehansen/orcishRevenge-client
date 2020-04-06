
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import styles from '../../style/styles';

class VerticalFlex extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container
        className={`${this.props.className} ${classes.verticalFlex}`}
        id={this.props.id}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.props.children}
      </Container>
    );
  }
}

VerticalFlex.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default withStyles(styles)(VerticalFlex);
