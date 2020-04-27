
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import styles from '../../style/styles';

class HorizontalFlex extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container
        className={`${this.props.className} ${classes.horizontalFlex}`}
        id={this.props.id}
      >
        {this.props.children}
      </Container>
    );
  }
}

HorizontalFlex.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default withStyles(styles)(HorizontalFlex);
