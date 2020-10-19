const initial = { isError: false, value: null }

const messageReducer = (state = initial, action) => {
  let changedState = { ...state }
  if (action.type === 'ADD_MESSAGE') {
    changedState = action.data
  }

  return changedState
}

export const addMessage = (message) => {
  return dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      data: message
    })
  }
}

export const resetMessage = () => {
  return dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      data: initial
    })
  }
}

export default messageReducer