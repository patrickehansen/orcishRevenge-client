
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
    return (
      <Layer >
        {[...Array(10)].map((_, i) => (
          <Token
            key={i}
            x={Math.random() * this.props.screenWidth}
            y={Math.random() * this.props.screenHeight}
            radius={16.5 * this.props.mapScale}
          />
        ))}
      </Layer>
    );
  }
}

PlayerLayer.propTypes = {
};

const mapStateToProps = (state) => ({
  mapScale: state.map.mapScale,
  screenWidth: state.map.screenWidth,
  screenHeight: state.map.screenHeight,
});

export default connect(mapStateToProps)(PlayerLayer);
