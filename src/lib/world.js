export function screenToWorld(stage, position) {
  // Find the bounding rectangle
  const rectangle = stage.find('#world')[0];

  // Find the position of the rectangle and scale of the stage
  const rectPos = rectangle.getAbsolutePosition();
  const stageScale = stage.scale();

  // Do the math and return
  return {
    x: (position.x - rectPos.x) / stageScale.x,
    y: (position.y - rectPos.y) / stageScale.y,
  }
}