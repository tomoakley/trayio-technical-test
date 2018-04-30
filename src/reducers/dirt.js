import _random from 'lodash/random';
import _uniqWith from 'lodash/uniqWith';
import _compact from 'lodash/compact';
import _isEqual from 'lodash/isEqual';

const GENERATE_DIRT_SUCCESS = 'tray/dirt/GENERATE_DIRT_SUCCESS';
const GENERATE_DIRT_FAILURE = 'tray/dirt/GENERATE_DIRT_FAILURE';

const CLEAN_DIRT_SUCCESS = 'tray/dirt/CLEAN_DIRT_SUCCESS';
const CLEAN_DIRT_FAILURE = 'tray/dirt/CLEAN_DIRT_FAILURE';

const initialState = {
  positions: [],
  error: null
};

const actionHandlers = {
  [GENERATE_DIRT_SUCCESS]: ({ positions }) => ({
    positions,
    error: null
  }),
  [GENERATE_DIRT_FAILURE]: ({ error }) => ({
    positions: [],
    error
  }),
  [CLEAN_DIRT_SUCCESS]: ({ positions }) => ({
    positions,
    error: null
  }),
  [CLEAN_DIRT_FAILURE]: ({ error }) => ({
    positions: [],
    error
  })
};

export default function reducer(state = initialState, { type, ...actionProps }) {
  if (type in actionHandlers) return actionHandlers[type](actionProps);
  return state;
}

function generateDirtSuccess(positions) {
  return {
    type: GENERATE_DIRT_SUCCESS,
    positions,
    error: null
  }
}

function generateDirtFailure({ error }) {
  return {
    type: GENERATE_DIRT_FAILURE,
    positions: [],
    error
  }
}

function cleanDirtSuccess(positions) {
  return {
    type: CLEAN_DIRT_SUCCESS,
    positions,
    error: null
  }
}

function cleanDirtFailure({ error }) {
  return {
    type: CLEAN_DIRT_FAILURE,
    positions: [],
    error
  }
}

export function generateDirt() {
  return (dispatch, getState) => {
    try {
      const {
        room: { size: roomSize },
        robot: { currentPosition: robotPosition }
      } = getState();
      const dirtToGenerate = 5;
      let positions = [];
      while(positions.length < dirtToGenerate) {
        const position = [_random(0, roomSize[0] - 1), _random(0, roomSize[1] - 1)];
        if (!_isEqual(position, robotPosition)) {
          positions.push(position);
          positions = _uniqWith(positions, _isEqual);
        }
      }
      dispatch(generateDirtSuccess(positions));
    } catch (err) {
      dispatch(generateDirtFailure(err));
    }
  }
}

export function cleanDirt(index) {
  return (dispatch, getState) => {
    try {
      const {
        dirt: { positions: dirtPositions }
      } = getState();
      dirtPositions[index] = false;
      dispatch(cleanDirtSuccess(_compact(dirtPositions)));
    } catch (err) {
      dispatch(cleanDirtFailure(err));
    }
  }
}
