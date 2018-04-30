const SET_ROOM_SIZE_SUCCESS = 'tray/room/SET_ROOM_SIZE_SUCCESS';
const SET_ROOM_SIZE_FAILURE = 'tray/room/SET_ROOM_SIZE_FAILURE';

const initialState = {
  size: [0, 0],
  error: null
};

const actionHandlers = {
  [SET_ROOM_SIZE_SUCCESS]: ({ size }) => ({
    size,
    error: null
  }),
  [SET_ROOM_SIZE_FAILURE]: ({ error }) => ({
    size: [0, 0],
    error
  })
};

export default function reducer(state = initialState, { type, ...actionProps }) {
  if (type in actionHandlers) return actionHandlers[type](actionProps);
  return state;
}

function setRoomSizeSuccess(size) {
  return {
    type: SET_ROOM_SIZE_SUCCESS,
    size,
    error: null
  }
}

function setRoomSizeFailure(error) {
  return {
    type: SET_ROOM_SIZE_FAILURE,
    size: [0, 0],
    error: error.message
  }
}

export function setRoomSize(size) {
  return (dispatch) => {
    try {
      if (size[0] < 5 || size[1] < 5) {
        throw new Error('Room Size cannot be less than 5 x 5');
      }
      dispatch(setRoomSizeSuccess(size));
    } catch (err) {
      dispatch(setRoomSizeFailure(err));
    }
  }
}
