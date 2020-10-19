
const userReducer = (state = [], action) => {
  let changedState = [ ...state ]
  if (action.type === 'USER_INIT') {
    changedState = action.data
  }

  return changedState
}

export const userInit = (users) => {
  return dispatch => {
    dispatch({
      type: 'USER_INIT',
      data: users
    })
  }
}

export default userReducer