
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layer, Group, Star } from 'react-konva';

import Token from '../token';

class PlayerLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  render() {
    const width = 1920;
    const height = 1080;

    // Do we need the group?

    return (
      <Layer >
        {[...Array(10)].map((_, i) => (
          <Token
            bounds={this.rect}
            key={i}
            x={Math.random() * width}
            y={Math.random() * height}
            radius={25}
          />
        ))}
      </Layer>
    );
  }
}

PlayerLayer.propTypes = {
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(PlayerLayer);
