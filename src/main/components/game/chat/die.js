import React from 'react';
import PropTypes from 'prop-types';

export default function Die(props) {
  let colorIdentifier;

  if (props.size > 4) {
    const isLow = props.roll <= 2;
    const isHigh = props.size - props.roll <= 1;

    if (isLow) colorIdentifier = 'low';
    if (isHigh) colorIdentifier = 'high';
  }

  return (
    <div className={`die ${colorIdentifier}`}>
      {props.roll}
    </div>
  );
}

Die.propTypes = {
  size: PropTypes.number.isRequired,
  roll: PropTypes.number.isRequired,
};
