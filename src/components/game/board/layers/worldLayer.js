
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layer, Group, Rect } from 'react-konva';
import { ReactReduxContext, Provider } from "react-redux";
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
    const width = 1920;
    const height = 1080;

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
          width={width}
          height={height}
        />
          <Group>
            {this.props.tiles.map((v, i) => <MapTile tile={v} key={i} />)}
          </Group>
      </Layer>
    );
  }
}

World.propTypes = {
  tiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tiles: state.map.tiles,
});

export default connect(mapStateToProps)(World);
