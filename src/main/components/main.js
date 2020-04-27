
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainPage extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className='mainView'>
        {children && children}
      </div>
    );
  }
}

MainPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainPage;
