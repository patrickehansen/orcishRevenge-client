
import {defineGrid, extendHex} from 'honeycomb-grid';

// square roots are expensive. do it once.
const root3 = Math.sqrt(3);

// The grid generation function requires the state to do its work
function getGrid(state) {
  const hexRadius = state.hexRadius * state.mapScale;
  const hex = extendHex({
    size: hexRadius,
    orientation: 'flat',
    component: null, // These to be assigned by the component that receives it
    ref: null,
    hash: null,
  })

  // Calculate the actual row and column size
  const hexWidth = hexRadius * 1.5;
  const hexHeight = hexRadius * root3;

  // Define the grid with the hex prototype
  const Grid = defineGrid(hex);

  // Calculate how many rows and columns we need and then generate them
  return {
    hexes: Grid.rectangle({ width: Math.floor((state.screenWidth - hexRadius)  / hexWidth), height: Math.floor((state.screenHeight - hexRadius) / hexHeight)}),
    grid: Grid,
  } 
}

const defaultAuthenticationState = {
  hexRadius : 20,
  mapScale : 1,
  screenWidth : 1920,
  screenHeight : 1080,
  hexes: null,
  grid: null
};

const grid = getGrid(defaultAuthenticationState);

defaultAuthenticationState.grid = grid.grid;
defaultAuthenticationState.hexes = grid.hexes;

const mapReducer = (state = defaultAuthenticationState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mapReducer;
