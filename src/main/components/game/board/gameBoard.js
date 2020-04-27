
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Stage } from 'react-konva';
import { ReactReduxContext, Provider } from "react-redux";

import WorldLayer from './layers/worldLayer';
import PlayerLayer from './layers/playerLayer';

import ErrorComponent from '../../util/error';

const scaleBy = 1.11;

const maxScale = 2.3;
const minScale = 0.15;

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.dragging = null;
    this.stage = React.createRef();

    window.addEventListener("resize", this.displayWindowSize);
  }

  componentDidMount() {
   // this.stage.screenToWorld = screenToWorld;
  }

  // We do this so that the stage will resize when the window does
  displayWindowSize = e => {
    this.forceUpdate();
  }

  stageDragStart = (e) => {
    e.evt.stopPropagation();
    e.evt.preventDefault();

    // Stop drag if this was a left-click on the stage
    if (e.evt.which === 1 && e.target.constructor.name === 'Stage') e.target.stopDrag();

    // Stop drag if it was a middle click and NOT the stage
    if (e.evt.which === 2 && e.target.constructor.name !== 'Stage') e.target.stopDrag();
  }

  onWheel = (e) => {
    e.evt.stopPropagation();
    e.evt.preventDefault();

    // Find the stage
    const stage = e.target.getStage();

    // Pull off the old stage and the old scale
    const oldScale = stage.scaleX();

    // Figure out where the mouse is so we can zoom in on that location
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    // Calculate the new scale
    let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
  
    // Clamp scale
    if (newScale > maxScale) newScale = maxScale;
    if (newScale < minScale) newScale = minScale;

    // Set the new scale
    stage.scale({ x: newScale, y: newScale });

    // Calculate the new position
    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    };

    // Set the new position
    stage.position(newPos);

    // ???
    stage.batchDraw();
  }



  render() {
    return (
      <ReactReduxContext.Consumer>
        {({store}) => (
          <Container component='div' className='canvas-root'>
          <Stage
            width={window.innerWidth - this.props.paneSize} 
            height={window.innerHeight}
            drawBorder={true}
            draggable={true}
            ref={this.stage}
  
            onDragStart={this.stageDragStart}
            onDragEnd={this.stageDragEnd}
  
            onWheel={this.onWheel}
          >
            <Provider store={store}>
              <WorldLayer />
              <PlayerLayer />
            </Provider>
          </Stage>
          <ErrorComponent error={this.state.error} />
        </Container>
        )}
      
      </ReactReduxContext.Consumer>
      
    );
  }
}

GameBoard.propTypes = {
  paneSize: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(GameBoard);
