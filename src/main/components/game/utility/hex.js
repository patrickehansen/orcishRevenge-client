import React from 'react';
import { RegularPolygon } from 'react-konva';

export default function Hex (props) {
  return (
    <RegularPolygon
      x={props.x}
      y={props.y}
      sides={6}
      radius={props.radius}
      rotation={props.rotation}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
    />
  );
}