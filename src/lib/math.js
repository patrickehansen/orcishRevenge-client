Math.dot = function dot(a,b) {
  return a.x * b.x + a.y * b.y;
}

Math.magnitude = function magnitude(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

Math.normalize = function normalize(a) {
  var mag = magnitude(a);

  if (mag === 0) {
    return {
      x: 0,
      y: 0
    };
  } else {
    return {
      x: a.x / mag,
      y: a.y / mag
    };
  }
}

