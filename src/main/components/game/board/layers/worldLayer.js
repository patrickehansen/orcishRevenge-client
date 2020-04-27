
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layer, Group, Rect } from 'react-konva';

import MapTile from '../mapTile';


class World extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.dragging = null;
    this.rect = React.createRef();
  }

  render() {
    return (
      <Layer >
        <Rect 
          ref={this.rect}
          x={0}
          y={0}
          id='world'
          stroke='black'
          fill='white'
          strokeWidth={1}
          width={this.props.screenWidth}
          height={this.props.screenHeight}
        />
          <Group>
            {this.props.hexes.map((v, i) => <MapTile grid={v} key={i} />)}
          </Group>
      </Layer>
    );
  }
}

World.propTypes = {
  hexes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  hexes: state.map.hexes,
  screenWidth: state.map.screenWidth,
  screenHeight: state.map.screenHeight,
});

export default connect(mapStateToProps)(World);
