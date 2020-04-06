import React, {Component} from 'react';
import { Group, Star, Circle, Line } from 'react-konva';
import Hex from '../utility/hex';
import {screenToWorld} from '../../../lib/world';

class Token extends Component {
  constructor(props) {
    super(props);

    this.node = null;
  }

  handleDragStart = e => {
    if (e.evt.which !== 1) e.target.stopDrag();

    this.dragging = e.target;
    this.dragging.rotating = e.evt.ctrlKey;

    if (!this.dragging.rotating) {
      e.target.setAttrs({
        shadowOffset: {
          x: 15,
          y: 15
        },
        scaleX: 1.1,
        scaleY: 1.1
      });
      e.target.draw();
    }
  };

  handleDragEnd = e => {
    if (!this.dragging) return;

    if (!this.dragging.rotating) {
      e.target.to({
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: 1,
        scaleY: 1,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      });
    }else{
      // Snap to nearest 60 degrees
      e.target.rotation(Math.round(this.dragging.rotation() / 60 ) * 60);
      this.dragging.getStage().batchDraw();
    }

    this.dragging = null;
  };

  rotate = (pos) => {
    // Get the current position
    const currentPos = this.dragging.absolutePosition();
    //const currentRotation = this.dragging.rotation(); I should use this at some point, but I need a better way to visualize it to debug it properly

    // Find the relative direction and convert to degrees
    const dir = Math.atan2(pos.y - currentPos.y, pos.x - currentPos.x) * 180 / Math.PI;

    // Set the new rotation. I would like to base it off of currentRotation eventually
    this.dragging.rotation(dir - 90);

    // Get the stage and batchDraw from there to update the visual effect. If we just call draw on the object it does weird black shit
    this.dragging.getStage().batchDraw();

    // Just return the current position so it doesn't move
    return currentPos;
  }

  dragBounds = pos => {
    if (!this.dragging) return;

    // Ctrl is being held, rotate
    if (this.dragging.rotating) {
      return this.rotate(pos);
    }

    // Find the bounding rectangle
    const stage = this.dragging.getStage();
    const cur = stage.find('#world')[0];

    console.log(this.dragging.width(), this.dragging.height())

    // Get the position, size and scale of the bounding rectangle
    const absPos = cur.absolutePosition();
    const selfRect = cur.getSelfRect();
    const scale = cur.getAbsoluteScale();

    // Scale and halve the width and height of the object we're dragging
    const width = this.dragging.width() * scale.x / 2;
    const height = this.dragging.height() * scale.y / 2;

    // Calculate the bounds
    const minX = absPos.x + width;
    const maxX = absPos.x + (selfRect.width * scale.x) - width;

    const minY = absPos.y + height;
    const maxY = absPos.y + (selfRect.height * scale.y) - height;

    // Start with the input coords
    let x = pos.x;
    let y = pos.y;

    // Gate the coordinates based on the bounding rectangle
    if (x < minX) x = minX;
    if (y < minY) y = minY;

    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;

    return {
      x: x,
      y: y
    }
  }

  render() {
    const {props} = this;

    return (
      <Group
        x={props.x}
        y={props.y}
        rotation={0}
        id={props.id}
        width={props.radius * 2.1}
        height={props.radius * 2.1}
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        dragBoundFunc={this.dragBounds}
      >
        <Hex 
          radius={props.radius * 1.1}
          stroke={props.color}
          strokeWidth={1}
          rotation={90}
        />
        <Line
          stroke={props.color}
          strokeWidth={1}
          points={[0,this.props.radius + 10,0,this.props.radius]}
        />
        <Star
          numPoints={3}
          innerRadius={props.radius*0.7}
          outerRadius={props.radius}
          fill="#89b717"
          opacity={0.8}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
        />
      </Group>
    )
  }
}

Token.defaultProps = {
  color: 'black',
  radius: 40
}

export default Token;