import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImportButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import styles from '../../style/styles';

class ContainedButton extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ImportButton
        className={`${this.props.className} ${classes.button}`}
        variant='contained'
        color={this.props.color || 'primary'}
        type={this.props.type || 'button'}
        fullWidth={this.props.fullWidth}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        id={this.props.id}
        size={this.props.size}
        width={this.props.width}
        disabled={this.props.disabled}
      >
      {this.props.children}
      </ImportButton>
    );
  }
}

ContainedButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  id: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(ContainedButton);
