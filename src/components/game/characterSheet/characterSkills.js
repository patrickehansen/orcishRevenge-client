import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

class CharacterSkills extends Component {
  render() {
    const { index, value } = this.props;

    return (
      <Container role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <div>
          Skills
        </div>
      </Container>
    );
  }
}

CharacterSkills.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default CharacterSkills;
