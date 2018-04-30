import _map from 'lodash/map';
import _forEach from 'lodash/forEach';
import FETCH_STATES from "../utils/FETCH_STATES";

const MOVE_ROBOT_SUCCESS = 'tray/robot/MOVE_ROBOT_SUCCESS';
const MOVE_ROBOT_FAILURE = 'tray/robot/MOVE_ROBOT_FAILURE';

const initialState = {
  fetchState: FETCH_STATES.INIT,
  position: [0, 0],
  error: null
};

const actionHandlers = {
  [MOVE_ROBOT_SUCCESS]: ({ position }) => {
    return {
      fetchState: FETCH_STATES.FETCH_SUCCESSFUL,
      position,
      error: null
    }
  },
  [MOVE_ROBOT_FAILURE]: ({ error }) => ({
    fetchState: FETCH_STATES.FETCH_FAILED,
    position: [0, 0],
    error
  })
};

export default function reducer(state = initialState, { type, ...actionProps }) {
  if (type in actionHandlers) return actionHandlers[type](actionProps);
  return state;
}

function moveRobotSuccess(position) {
  return {
    type: MOVE_ROBOT_SUCCESS,
    position,
    error: null
  }
}

function moveRobotFailure(currentPosition, { message }) {
  return {
    type: MOVE_ROBOT_FAILURE,
    currentPosition,
    error: message
  }
}

export function setStartPosition(position) {
  return (dispatch, getState) => {
    const {
      room: { size }
    } = getState();
    try {
      _forEach(position, (coordinate, i) => {
        if (coordinate > size[i]) {
          throw new Error("Robot cannot be placed outside of the room")
        }
      });
      dispatch(moveRobotSuccess(position));
    } catch (err) {
      dispatch(moveRobotFailure([0, 0], err));
    }
  }
}

export function moveRobot(squaresToMove) {
  return (dispatch, getState) => {
    const {
      robot: { position },
      room: { size }
    } = getState();
    try {
      const coordinates = _map(position, (coordinate, i) => {
        if (coordinate + squaresToMove[i] < 0) {
          return 0;
        } else if (coordinate + squaresToMove[i] >= size[i]) {
          return size[i] - 1;
        }
        return coordinate + squaresToMove[i];
      });
      dispatch(moveRobotSuccess(coordinates));
    } catch (err) {
      dispatch(moveRobotFailure(position, err));
    }
  }
}
