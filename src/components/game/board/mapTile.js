import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RegularPolygon } from 'react-konva';

export default class MapTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fill: undefined,
      selected: false,
    };

    this.ref = React.createRef();

    this.props.grid.component = this;
    this.props.grid.ref = this.ref;
    this.props.grid.hash = `${this.props.grid.x}:${this.props.grid.y}`
  }

  onClick = (e) => {
    this.setState({
      selected: !this.state.selected,
    });
  }

  render() {
    const center = this.props.grid.toPoint();

    const xOff = this.props.grid.size.xRadius;
    const yOff = this.props.grid.size.yRadius;

    return (
      <RegularPolygon
        ref={this.ref}
        x={center.x + xOff}
        y={center.y + yOff}
        id={this.props.grid.hash}
        sides={6}
        radius={this.props.grid.size.xRadius}
        fill={this.state.selected ? 'red' : undefined}
        onClick={this.onClick}
        rotation={90}
        stroke={'rgba(0,0,0,0.25)'}
        strokeWidth={1}
      />
    );
  }
}

MapTile.propTypes = {
  grid: PropTypes.object.isRequired,
};
