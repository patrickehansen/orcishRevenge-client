import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

class Inventory extends Component {
  render() {
    const { index, value } = this.props;

    return (
      <Container role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <div>
          Inventory
        </div>
      </Container>
    );
  }
}

Inventory.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Inventory;
